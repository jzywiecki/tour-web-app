import { Component, Input } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-remove-trip',
  templateUrl: './remove-trip.component.html',
  styleUrls: ['./remove-trip.component.css']
})
export class RemoveTripComponent {
  service: any
  @Input() i: number = -1
  @Input() k: string;

  constructor(service: ServicesService){
    this.service = service
  }

  remove(k: string){
    this.service.remove(k)
  }
}
