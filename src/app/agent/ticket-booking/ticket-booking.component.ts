import { Component, OnInit } from '@angular/core';
import { SeatConfigService } from 'src/app/shared/services/seat-config.service';
import { Seat } from 'src/app/shared/models/seats';
import { Passenger } from 'src/app/shared/models/passenger';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss'],
})
export class TicketBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  seatCountSetting: boolean = true;
  seats!: Seat[];
  passengers!: Passenger[];
  data: any;
  seatConfig: any;
  seatsData: any;
  overallData: any;
  submitted = false;
  limitedSeatError:any;
  constructor(
    public _seatsService: SeatConfigService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      seatCount: ['', [Validators.required,Validators.maxLength(7)]],
    });
    this.seats = [];
    this.passengers = [];
    this.data = localStorage.getItem('seats');
    console.log(JSON.parse(this.data), 'sssssssssssssssssssssssss');
    this.seatConfig = JSON.parse(this.data);

    const numSeats = this.seatConfig.totalseats;
    const compartmentCapacity = this.seatConfig.seatingCapacity;
    for (let i = 1; i <= numSeats; i++) {
      const row = Math.floor((i - 1) / 6) + 1;
      const column = Math.floor((i - 1) / 6) + 1;
      const category =
        i % 6 === 0 || i % 6 === 5
          ? 'window'
          : i % 6 === 1 || i % 6 === 4
          ? 'middle'
          : 'aisle';
      this.seats.push({
        seatNo: i,
        status: 'available',
        category: category,
        bookedBy: '',
        row: row,
        column: column,
      });
    }
    console.log(this.seats);
    localStorage.setItem('seatsData', JSON.stringify(this.seats));
    this.getData();
  }
  getData() {
    this.overallData = localStorage.getItem('seatsData');
    this.seatsData = JSON.parse(this.overallData);
    let d = Object.assign({}, ...this.seatsData);
    console.log(d, 'seatsData');
  }
  bookingSeat() {
    this.submitted = true;
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value.seatCount);
      
      if (this.bookingForm.value.seatCount > 7) {
        this.submitted = true;
       
      }
      else{
        this.seatCountSetting = false;
        this.submitted = false;
      }
    }
    
    console.log(this.bookingForm.value);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bookingForm.controls;
  }
}
