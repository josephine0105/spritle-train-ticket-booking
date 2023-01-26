import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { AngularModulesModule } from '../shared/angular-modules/angular-modules.module';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    CreateAgentComponent,
    TicketBookingComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    AngularModulesModule
  ]
})
export class AgentModule { }
