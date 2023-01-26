import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatConfigComponent } from '../admin/seat-config/seat-config.component';
import { CreateAgentComponent } from '../agent/create-agent/create-agent.component';
import { ProfileComponent } from '../agent/profile/profile.component';
import { TicketBookingComponent } from '../agent/ticket-booking/ticket-booking.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      },
      {
        path: 'agent',
        component: CreateAgentComponent,
      },
      {
        path: 'ticket',
        component: TicketBookingComponent,
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'seat',
        component:SeatConfigComponent
      }
    ],
  },
  {
    path:'header',
    component:HeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
