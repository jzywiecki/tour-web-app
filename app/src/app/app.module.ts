import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { RemoveTripComponent } from './remove-trip/remove-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { RateTripComponent } from './rate-trip/rate-trip.component';
import { FilterTripsComponent } from './filter-trips/filter-trips.component';
import { BasketComponent } from './basket/basket.component';
import { TripComponent } from './trip/trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipePipe } from '../app/filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SingleTripComponent } from './single-trip/single-trip.component'; 
import { environment } from 'src/enviroments/enviroment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RejectionComponent } from './rejection/rejection.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    RemoveTripComponent,
    AddTripComponent,
    RateTripComponent,
    FilterTripsComponent,
    BasketComponent,
    TripComponent,
    HeaderComponent,
    FilterPipePipe,
    MenuComponent,
    HomeComponent,
    SingleTripComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    RejectionComponent,
    EditTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
