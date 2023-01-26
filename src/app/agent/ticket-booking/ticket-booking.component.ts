import { Component, OnInit } from '@angular/core';
import { SeatConfigService } from 'src/app/shared/services/seat-config.service';
import { Seat } from 'src/app/shared/models/seats';
// import { Passenger } from 'src/app/shared/models/passenger';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss'],
})
export class TicketBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  seatCountSetting: boolean = true;
  seats!: Seat[];
  data: any;
  seatConfig: any;
  seatsData: any;
  overallData: any;
  submitted = false;
  limitedSeatError: any;
  ticketCount!: number;
  passengers = [{ name: '', age: '', gender: '' }];
  constructor(
    public _seatsService: SeatConfigService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      seatCount: ['', [Validators.required, Validators.maxLength(7)]],
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
 
  addPassenger() {
    this.passengers.push({ name: '', age: '', gender: '' });
  }

  allocateSeats(passengers: any[]) {
    console.log(passengers, 'passengers');
    passengers.forEach((passenger) => {
      if (passenger.age >= 60) {
        const windowSeat = this.seatsData.find(
          (seat: any) =>
            seat.category === 'window' && seat.status === 'available'
        );
        if (windowSeat) {
          windowSeat.status = 'booked';
          windowSeat.bookedBy = passenger;
        } else {
          const middleSeat = this.seatsData.find(
            (seat: any) =>
              seat.category === 'middle' && seat.status === 'available'
          );
          if (middleSeat) {
            middleSeat.status = 'booked';
            middleSeat.bookedBy = passenger;
          }
        }
      } else {
        if (passenger.gender === 'female') {
          console.log('sssssssssssssssssssssss', this.seatsData);
          const windowSeat = this.seatsData.find(
            (seat: any) =>
              seat.category === 'window' && seat.status === 'available'
          );
          if (windowSeat) {
            windowSeat.status = 'booked';
            windowSeat.bookedBy = passenger;
          } else {
            const middleSeat = this.seatsData.find(
              (seat: any) =>
                seat.category === 'middle' && seat.status === 'available'
            );
            if (middleSeat) {
              console.log('femlee');
              middleSeat.status = 'booked';
              middleSeat.bookedBy = passenger;
            } else {
              const aisleSeat = this.seatsData.find(
                (seat: any) =>
                  seat.category === 'aisle' && seat.status === 'available'
              );
              if (aisleSeat) {
                aisleSeat.status = 'booked';
                aisleSeat.bookedBy = passenger;
              } else {
                const aisleSeat = this.seatsData.find(
                  (seat: any) =>
                    seat.category === 'aisle' && seat.status === 'available'
                );
                if (aisleSeat) {
                  aisleSeat.status = 'booked';
                  aisleSeat.bookedBy = passenger;
                } else {
                  // check for any other available seats
                  const availableSeat = this.seatsData.find(
                    (seat: any) => seat.status === 'available'
                  );
                  if (availableSeat) {
                    availableSeat.status = 'booked';
                    availableSeat.bookedBy = passenger;
                  } else {
                    console.log('No seats available for booking');
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  ticketBooking() {
    this.submitted = true;
    console.log(this.ticketCount);
    console.log(this.passengers);
    if (this.ticketCount && this.passengers) {
      this.seatCountSetting=false;
      let lastAllocatedSeat = 0;
      for (let passenger of this.passengers) {
        if (parseInt(passenger.age) > 60) {
          let availableWindowSeats = this.seatsData.filter(
            (seat: any) =>
              seat.category === 'window' && seat.status === 'available'
          );
          if (availableWindowSeats.length > 0) {
            availableWindowSeats[0].bookedBy = passenger.name;
            availableWindowSeats[0].status = 'booked';
            lastAllocatedSeat = availableWindowSeats[0].seatNo;
            continue;
          }
          let availableMiddleSeats = this.seatsData.filter(
            (seat: any) =>
              seat.category === 'middle' && seat.status === 'available'
          );
          if (availableMiddleSeats.length > 0) {
            availableMiddleSeats[0].bookedBy = passenger.name;
            availableMiddleSeats[0].status = 'booked';
            lastAllocatedSeat = availableMiddleSeats[0].seatNo;
            continue;
          }
        } else {
          if (passenger.gender === 'female') {
            let availableSeats = this.seatsData.filter(
              (seat: any) => seat.status === 'available'
            );
            if (availableSeats.length > 0) {
              let availableSeatsForFemale = availableSeats.filter(
                (seat: any) =>
                  (seat.seatNo - lastAllocatedSeat) % 6 !== 0 &&
                  (seat.seatNo - lastAllocatedSeat) % 6 !== 1
              );
              if (availableSeatsForFemale.length > 0) {
                availableSeatsForFemale[0].bookedBy = passenger.name;
                availableSeatsForFemale[0].status = 'booked';
                lastAllocatedSeat = availableSeatsForFemale[0].seatNo;
                continue;
              }
            }
          } else {
            let availableSeats = this.seatsData.filter(
              (seat: any) => seat.status === 'available'
            );
            if (availableSeats.length > 0) {
              let availableSeatsForMale = availableSeats.filter(
                (seat: any) =>
                  (seat.seatNo - lastAllocatedSeat) % 6 !== 0 &&
                  (seat.seatNo - lastAllocatedSeat) % 6 !== 1
              );
              if (availableSeatsForMale.length > 0) {
                availableSeatsForMale[0].bookedBy = passenger.name;
                availableSeatsForMale[0].status = 'booked';
                lastAllocatedSeat = availableSeatsForMale[0].seatNo;
                continue;
              }
            }
          }
        }
        let remainingSeats = this.seatsData.filter(
          (seat: any) => seat.status === 'available'
        );
        if (remainingSeats.length === 0) {
          
          this.toastr.error('All the seats are booked!', '', {
            timeOut: 2000,
          });
        }
      }
    }

    console.log(this.bookingForm.value);
  }
  updateSeatAllocation() {
    console.log(this.passengers, 'passengers');
    for (let i = 0; i < this.passengers.length; i++) {
      const passenger = this.passengers[i];
      const seat = this.seatsData.find((s: any) => s.status === 'available');
      if (seat) {
        seat.bookedBy = passenger.name;
        seat.status = 'booked';
      } else {
        this.limitedSeatError = 'No more seats available';
        break;
      }
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.bookingForm.controls;
  }
}
