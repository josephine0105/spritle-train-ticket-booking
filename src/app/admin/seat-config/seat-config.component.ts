import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SeatConfigService } from 'src/app/shared/services/seat-config.service';

@Component({
  selector: 'app-seat-config',
  templateUrl: './seat-config.component.html',
  styleUrls: ['./seat-config.component.scss']
})
export class SeatConfigComponent implements OnInit {
  seatForm!:FormGroup;
  submitted = false;
  setConfig:any;
  constructor(   public router: Router,
    private formBuilder: FormBuilder,
    public _authService: AuthService,public _seatsService:SeatConfigService) { }

  ngOnInit(): void {
     this.seatForm = this.formBuilder.group({
      seats: ['', [Validators.required]],
      seatingCapacity: ['', Validators.required],
      totalseats: ['', Validators.required],
    });
  }
  seatConfig(){
    this.submitted = true;
    if (this.seatForm.valid) {
      this.submitted = false;
      localStorage.setItem('seats',JSON.stringify(this.seatForm.value))
    console.log( JSON.stringify(this.seatForm.value),'JSON.stringify(this.seatForm.value)')
    }
      else
      {
        return
      }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.seatForm.controls;
  }
}
