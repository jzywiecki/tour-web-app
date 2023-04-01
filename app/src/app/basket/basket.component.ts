import { Component } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  service: any

  constructor(service: ServicesService){
    this.service = service
  }

  calculateSum(){
    let sum: number = 0

    if (this.service.trips){
      for (let i in this.service.trips){
        let trip = this.service.trips[i];
        if (trip.key in this.service.chosenTrips){
          sum += this.service.chosenTrips[trip.key] * trip.unitPrice;
        }
      }
    }
    else{
      return 0;
    }
    return sum
  }
}
