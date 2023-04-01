import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review, Trip, User } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
  providers: [FormBuilder]
})
export class SingleTripComponent {
  photoID: number = 0;
  photoLink: string = "";
  trip: Trip;
  service: any;
  authService: any;
  reviews: Review[] = [];
  review: Review;
  reviewForm: FormGroup;
  private subscription: Subscription | undefined
  i: number = -1;

  constructor(private route: ActivatedRoute, service: ServicesService, authService: AuthService) {
    this.service = service;
    this.authService = authService;
  }
  
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.i = params['id']
    })
    this.trip = this.service.getTrips()[this.i];
    console.log(this.trip);
  
    if (this.review == null) {
      this.review = new Review();
    }

    this.reviewForm = new FormGroup({
      nick: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
      purchaseDate: new FormControl ('', [])
    });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

  onSubmit(): void {
    if (this.authService.loggedUser.banned){
      return;
    }
    let review: Review = this.reviewForm.value;
    this.reviewForm.reset();
    this.reviews.push(review);
  }


}
