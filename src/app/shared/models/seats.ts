export class Seat {
    seatNo!: number;
    status!: 'available' | 'booked';
    category!: 'window' | 'middle' | 'aisle';
    bookedBy!: string;
    row!: number;
    column!:number;
  }