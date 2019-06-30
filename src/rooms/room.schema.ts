import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
    roomType: String,
    price: Number,
    bookings: [Date],
})
