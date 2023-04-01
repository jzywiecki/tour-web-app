import { Component } from '@angular/core';
import { User } from '../models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rate-trip',
  templateUrl: './rate-trip.component.html',
  styleUrls: ['./rate-trip.component.css']
})
export class RateTripComponent {
  rates: number[] = []
  tripRate: number = 0
  rated: boolean = false
  constructor(public authService: AuthService){}

  addRate(rate: number){
    if (this.authService.loggedUser.banned){
      return;
    }
    if (this.rated == false){
    this.rates.push(rate)
    this.tripRate = (this.rates.reduce((acc, curr) => acc + curr)/this.rates.length)
    this.rated = true
    }
  }

}
