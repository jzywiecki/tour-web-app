import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TripsComponent } from './trips/trips.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BasketComponent } from './basket/basket.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { UserGuard } from './guards/user.guard';
import { AdminComponent } from './admin/admin.component';
import { ManagerGuard } from './guards/manager.guard';
import { AdminGuard } from './guards/admin.guard';
import { RejectionComponent } from './rejection/rejection.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'trips', component: TripsComponent},
  { path: 'rejection', component: RejectionComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  { path: 'trips/:id', component: SingleTripComponent, canActivate:[UserGuard]},
  { path: 'add-trip', component: AddTripComponent, canActivate:[ManagerGuard]},
  { path: 'add-trip/:id', component: EditTripComponent, canActivate:[ManagerGuard]},
  { path: 'basket', component: BasketComponent, canActivate:[UserGuard]},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
}
