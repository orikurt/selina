import * as mongoose from 'mongoose';
import { LocationSchema } from './location.schema';

mongoose.connect("mongodb://localhost/selina", function(err){
    if (err){
        console.error(err);
        process.exit();
    }
});

const locationModel = mongoose.model('Location', LocationSchema);

const roomsData = [
    {
        roomType: 'Dorm',
        price: 10.0
    },
    {
        roomType: 'Private',
        price: 20.0
    },
    {
        roomType: 'Delux',
        price: 30.0
    }
];

const locationsData = [
    {
        city: 'Antigua',
        country: 'Guatamala',
        rooms: roomsData
    },
    {
        city: 'Bocas del toro',
        country: 'Panama',
        rooms: roomsData
    },
    {
        city: 'Cancun',
        country: 'Mexico',
        rooms: roomsData
    },
    {
        city: 'Cartagena',
        country: 'Colombia',
        rooms: roomsData
    },
    {
        city: 'Granada',
        country: 'Nicaragua',
        rooms: roomsData
    },
    {
        city: 'Ontario',
        country: 'Canada',
        rooms: roomsData
    }
];

let count = 0;

for (let i in locationsData){
    console.log(`creating ${locationsData[i].city}, ${locationsData[i].country}`);
    const location = locationModel(locationsData[i]);
    location.save().then(() => {
        count++;
        if (count == locationsData.length){
            process.exit();
        }
    });
}