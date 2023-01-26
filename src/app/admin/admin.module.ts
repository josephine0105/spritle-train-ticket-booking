import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SeatConfigComponent } from './seat-config/seat-config.component';
import { AngularModulesModule } from '../shared/angular-modules/angular-modules.module';


@NgModule({
  declarations: [
    SeatConfigComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularModulesModule
  ]
})
export class AdminModule { }
