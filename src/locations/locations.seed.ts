import * as mongoose from 'mongoose';
import { LocationSchema } from './location.schema';
import { RoomSchema } from '../rooms/room.schema';

mongoose.connect("mongodb://localhost/selina", function(err){
    if (err){
        console.error(err);
        process.exit();
    }
});

const locationModel = mongoose.model('Location', LocationSchema);
const roomModel = mongoose.model('Room', RoomSchema);

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
    },
    {
        city: 'Bocas del toro',
        country: 'Panama',
    },
    {
        city: 'Cancun',
        country: 'Mexico',
    },
    {
        city: 'Cartagena',
        country: 'Colombia',
    },
    {
        city: 'Granada',
        country: 'Nicaragua',
    },
    {
        city: 'Ontario',
        country: 'Canada',
    }
];

let count = 0;

for (let i in locationsData){
    console.log(`creating ${locationsData[i].city}, ${locationsData[i].country}`);
    const location = locationModel(locationsData[i]);
    location.save().then(async () => {
        for (let i in roomsData){
            let roomData = roomsData[i];
            for (let j = 0; j < 10; j++){
                roomData['locationId'] = location.id;
                const room = roomModel(roomData);
                await room.save();
            }
        }
        count++;
        if (count == locationsData.length){
            process.exit();
        }
    });
}