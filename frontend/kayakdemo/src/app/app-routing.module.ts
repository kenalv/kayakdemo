import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlightsComponent} from './flights/flights.component'
import { BookingComponent } from './booking/booking.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  {path: '', redirectTo: 'flights', pathMatch: 'full'},
  {path: 'flights/:origin/:destiny/:out_date/:in_date/:tickets/:search_status', component: FlightsComponent},
  {path: 'flights/:origin/:destiny/:out_date/:tickets/:search_status', component: FlightsComponent},
  {path: 'reserve/:idOut/:idIn/:tickets/:ida', component: BookingComponent},
  {path: 'reserve/:idOut/:tickets/:ida', component: BookingComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
