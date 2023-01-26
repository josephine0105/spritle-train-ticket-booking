import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatConfigComponent } from './seat-config/seat-config.component';

const routes: Routes = [
  {
    path:'seat',
    component:SeatConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
