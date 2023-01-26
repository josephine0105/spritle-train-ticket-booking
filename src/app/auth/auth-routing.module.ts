import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBookingComponent } from '../agent/ticket-booking/ticket-booking.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'ticket',
    component: TicketBookingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
