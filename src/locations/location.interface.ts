import { Room } from '../rooms/room.interface';

export interface Location{
    city: string;    
    country: string;
    rooms: [Room]
}