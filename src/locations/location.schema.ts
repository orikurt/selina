import { Schema } from 'mongoose';

export const LocationSchema = new Schema({
    city: String,    
    country: String,
});