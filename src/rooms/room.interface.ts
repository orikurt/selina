import { Booking } from '../bookings/bookings.interface';

export interface Room{
    locationId: string;
    roomType: string;
    price: number;
    bookings: [Booking];
}