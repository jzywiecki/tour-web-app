import { Component } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-filter-trips',
  templateUrl: './filter-trips.component.html',
  styleUrls: ['./filter-trips.component.css']
})

export class FilterTripsComponent {
  service: any 
  name: string = ''
  maxPrice: number = Number.MAX_VALUE
  minPrice: number = 0

  changeName(){
    this.service.changeFilterName(document.getElementById('filtername'));
  }

  constructor(service: ServicesService){
    this.service = service
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
