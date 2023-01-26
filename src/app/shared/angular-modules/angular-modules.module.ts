import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ToastrModule
  ]
})
export class AngularModulesModule { }
