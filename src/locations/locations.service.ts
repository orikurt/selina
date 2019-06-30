import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './location.interface';

@Injectable()
export class LocationsService {
    
    constructor(@InjectModel('Location') private readonly locationModel: Model<Location>) {};
    
    async create(locationData){
        const location = new this.locationModel(locationData);
        return await location.save();
    }

    async index(): Promise<Location[]>{
        return this.locationModel.find({}, {country: 1, city: 1, _id: 1});
    }
}
