import { Injectable } from '@angular/core';
import { Trip } from './models'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService{
  trips: Trip[] = [];
  chosenTrips: {[id:string]: number} = {};
  maxUnitPrice: number = 0
  minUnitPrice: number = Number.MAX_VALUE
  filterName: string = ''
  filterMinRate: number = 0
  filterMaxRate: number = 5
  constructor(private db: AngularFirestore) {
      this.getTripsList().subscribe(value => {
        this.trips = value
        for (let i of value){
          this.chosenTrips[i.key] = 0;
        }
        this.maxUnitPrice = Math.max(...this.trips.map(value=>value.unitPrice))
        this.minUnitPrice = Math.min(...this.trips.map(value=>value.unitPrice))
      });
  }


  addToCart(index: string){
    if (index in this.chosenTrips){
      this.chosenTrips[index] += 1;
    }
    else{
      this.chosenTrips[index] = 1;
    }
  }


  removeFromCart(index: number){
    this.chosenTrips[index] -= 1;
  }

  getAmount(){
    let count = 0;
    for (let i in this.chosenTrips){
      count += this.chosenTrips[i];
    }
    return count;
  }

  getTrips(){
    return this.trips
  }

  remove(index: string){
    this.db.collection('/trips/').doc(index).delete();
    delete this.chosenTrips[index];
    this.getTripsList().subscribe(value => {
      this.trips = value
      this.maxUnitPrice = Math.max(...this.trips.map(value=>value.unitPrice))
      this.minUnitPrice = Math.min(...this.trips.map(value=>value.unitPrice))
    });

  }

  addTrip(trip: Trip){
    this.db.collection('/trips').add({
      name : trip.name,
      country : trip.country,
      description: trip.description,
      endDate: trip.endDate,
      startDate: trip.startDate,
      unitPrice: +trip.unitPrice,
      maxAttendance: +trip.maxAttendance, 
      photos: [trip.photos],
      rates: []
    })

    this.getTripsList().subscribe(value => {
      this.trips = value
      this.maxUnitPrice = Math.max(...this.trips.map(value=>value.unitPrice))
      this.minUnitPrice = Math.min(...this.trips.map(value=>value.unitPrice))
      for (let i of value){
        if (!(i.key in this.chosenTrips)){
          this.chosenTrips[i.key] = 0;
        }
      }
    });
  }



  getTripsList(): Observable<Trip[]> {
    const ref = this.db.collection<Trip>('/trips');
    return ref.valueChanges({ idField: 'key' });
  }


  updateTrip(key: string, value: any) {
    this.db.doc('/trips/'+key).set({
      'name': value.name,
      'country': value.country,
      'description': value.description,
      'endDate': value.endDate,
      'startDate': value.startDate,
      'photos': value.photos,
      'maxAttendance': value.maxAttendance,
      'unitPrice': value.unitPrice
    })
  }
}
