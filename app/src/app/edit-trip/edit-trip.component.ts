import { Component, OnInit} from '@angular/core';
import { ServicesService } from '../services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit{
  i: number = -1
  private subscription: Subscription | undefined
  trip: Trip;

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.i = params['id']
    })
    this.trip = this.service.getTrips()[this.i];
    this.modelForm = this.formBuilder.group({
      name: new FormControl(this.trip.name, Validators.required),
      country: new FormControl(this.trip.country, [Validators.required]),
      startDate: new FormControl(this.trip.startDate, [Validators.required, Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/[0-9]{4}$")]),
      endDate: new FormControl(this.trip.endDate, [Validators.required, Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")]),
      unitPrice: new FormControl(this.trip.unitPrice, [Validators.required, Validators.pattern("^[0-9]*$")]),
      maxAttendance: new FormControl(this.trip.maxAttendance, [Validators.required,Validators.pattern("^[0-9]*$")]),
      description: new FormControl(this.trip.description, Validators.required),
      photos: new FormControl(this.trip.photos, Validators.required)
    });
  }

  modelForm : FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder : FormBuilder, public service: ServicesService) {

   }
 
   submit(){
     let trip = this.modelForm.value
     this.modelForm.reset()
     this.service.updateTrip(this.trip.key, trip);
     this.router.navigate(['add-trip']) ; 
   }

   ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
  
}




