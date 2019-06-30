import { Schema } from 'mongoose';
import { BookingSchema } from '../bookings/bookings.schema';

export const RoomSchema = new Schema({
    locationId: Schema.Types.ObjectId,
    roomType: String,
    price: Number,
    bookings: [BookingSchema],
})
