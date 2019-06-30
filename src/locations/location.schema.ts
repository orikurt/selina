import * as mongoose from 'mongoose';
import { RoomSchema } from '../rooms/room.schema';

export const LocationSchema = new mongoose.Schema({
    city: String,    
    country: String,
    rooms: [RoomSchema]
});