import { Component } from '@angular/core';
import { Trip } from '../models'
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent {
  service: any
  constructor(service: ServicesService){
    this.service = service
  }
  
}
