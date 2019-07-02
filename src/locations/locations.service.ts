import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './location.interface';
import { Room } from '../rooms/room.interface';

@Injectable()
export class LocationsService {
    
    constructor(
        @InjectModel('Location') private readonly locationModel: Model<Location>,
        @InjectModel('Room') private readonly roomModel: Model<Room>
        ) {};
    
    async create(locationData){
        const location = new this.locationModel(locationData);
        return await location.save();
    }

    async index(): Promise<Location[]>{
        return this.locationModel.find({}, {country: 1, city: 1, _id: 1});
    }

    // async findRooms(locationId: String, from: Date, until: Date){
    //     return this.roomModel.aggregate([
    //         { $match: {
    //             locationId: Types.ObjectId(locationId), 
    //             "bookings.from": { 
    //                 $not :{ $gte: from, $lte: until } 
    //             },
    //             "bookings.until": { 
    //                 $not :{ $gte: from, $lte: until }
    //             }
    //         } },
    //         { $group: { 
    //             _id: "$roomType", 
    //             price: { $first: "$price" }
    //         } },
    //         { $project: { _id: 0, roomType: "$_id", price: 1 }}
    //     ]);
    // }

    async findRooms(locationId: String, from: Date, until: Date){
        return this.roomModel.find({
            locationId,
            "bookings.from": { 
                $not: { $gte: from, $lte: until } 
            },
            "bookings.until": { 
                $not: { $gte: from, $lte: until }
            },
            $and: [
                { "bookings.from": { 
                    $not: { $lt: from }
                }},
                { "bookings.until": { 
                    $not: { $gt: until }
                }},
            ]
        }, 
        {
            _id: 1,
            roomType: 1,
            price: 1
        });
    }

    async bookRoom(locationId: String, roomType: String, from: Date, until: Date){
        return this.roomModel.findOneAndUpdate({
            locationId,
            roomType, 
            "bookings.from": { 
                $not: { $gte: from, $lte: until } 
            },
            "bookings.until": { 
                $not: { $gte: from, $lte: until }
            },
            $and: [
                { "bookings.from": { 
                    $not: { $lt: from }
                }},
                { "bookings.until": { 
                    $not: { $gt: until }
                }},
            ]
        },
        { $push: { bookings: { from: from, until: until } }},
        { new: true }
        );
    }
}
