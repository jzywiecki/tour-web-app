import { Component, Input } from '@angular/core';
import { ServicesService } from '../services.service';
import { Trip } from '../models';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent {
  service: any
  @Input() trip: Trip = new Trip();
  @Input() i: number = -1
  @Input() k: string
  constructor(service: ServicesService){
    this.service = service
  }
}
