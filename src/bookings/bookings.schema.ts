import { Schema } from 'mongoose';

export const BookingSchema = new Schema({
    from: {type: Date, required: true},
    until: {type: Date, required: true}
})