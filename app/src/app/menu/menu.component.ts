import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  service: any
  authService: any
  constructor(service: ServicesService, authService: AuthService){
    this.service = service
    this.authService = authService
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

  isLogged(){
    return this.authService.loggedUser != null;
  }

  isManager(){
    return this.authService.loggedUser?.role === "Manager";
  }

  isAdmin(){
    return this.authService.loggedUser?.role == "Admin";
  }
}
