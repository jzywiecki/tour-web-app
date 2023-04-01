import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Trip } from '../models';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent{
  modelForm : FormGroup;
 constructor(private formBuilder : FormBuilder, public service: ServicesService) {
  this.modelForm = this.formBuilder.group({
    name: new FormControl("", Validators.required),
    country: new FormControl("", [Validators.required]),
    startDate: new FormControl("", [Validators.required, Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/[0-9]{4}$")]),
    endDate: new FormControl("", [Validators.required, Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")]),
    unitPrice: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
    maxAttendance: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$")]),
    description: new FormControl("", Validators.required),
    photos: new FormControl("", Validators.required)
  });
  }

  submit(){
    let trip = this.modelForm.value
    this.modelForm.reset()
    this.service.addTrip(trip)
  }
}
 
