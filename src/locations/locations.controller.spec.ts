import { model } from 'mongoose';
import { LocationsService } from './locations.service';
import { LocationSchema } from './location.schema';
import { RoomSchema } from '../rooms/room.schema';

describe('Locations Service', () => {
    let locationsService: LocationsService;
    let locationModel = model('Location', LocationSchema);
    let roomModel = model('Room', RoomSchema)
  beforeEach(() => {
    locationsService = new LocationsService(locationModel, roomModel);
  });

  describe('CRUD locations', () => {

    it('succeeds create location', () => {
        locationsService.create({
            city: 'Mumbay',
            country: 'India'
        }).then((createdLocation)=>expect(createdLocation).toHaveProperty('rooms'));
    });

    it('gets all locations', () => {
        locationsService.index().then(locations=>expect(locations).toHaveLength(1));
    })
  });


  describe('Booking', () => {

      it('Find available rooms', (done) => {
        return locationModel.create({
            city: 'Shasta',
            country: 'mCnasty'
        }).then( (location) => {
            return roomModel.create({
                roomType: 'Dorm',
                price: 10.0,
                locationId: location._id
            }).then( (room) => {
                return locationsService.findRooms(location._id, new Date('2019-07-05T00:00:00.000Z'), new Date('2019-07-15T00:00:00.000Z')).then((rooms)=>{
                    expect(rooms[0]._id).toEqual(room._id);
                    done();
                });
            });
        });
      });

      it('Booking for same dates', () => {
        locationModel.create({
            city: 'Steve',
            country: 'mCqueen'
        }).then( (location) => {
            roomModel.create({
                roomType: 'Dorm',
                price: 10.0,
                locationId: location._id,
                bookings: [{
                    from: new Date('2019-07-05T00:00:00.000Z'), 
                    until: new Date('2019-07-15T00:00:00.000Z')
                }]
            }).then( (room) => {
                locationsService.findRooms(location._id, new Date('2019-07-05T00:00:00.000Z'), new Date('2019-07-15T00:00:00.000Z')).then((rooms)=>{
                    expect(rooms).toHaveLength(0);
                });
            });
        });
      });

      it('Booking for dates whithin booking dates', () => {
        locationModel.create({
            city: 'Steve',
            country: 'mCqueen'
        }).then( (location) => {
            roomModel.create({
                roomType: 'Dorm',
                price: 10.0,
                locationId: location._id,
                bookings: [{
                    from: new Date('2019-07-07T00:00:00.000Z'), 
                    until: new Date('2019-07-12T00:00:00.000Z')
                }]
            }).then( (room) => {
                locationsService.findRooms(location._id, new Date('2019-07-05T00:00:00.000Z'), new Date('2019-07-15T00:00:00.000Z')).then((rooms)=>{
                    expect(rooms).toHaveLength(0);
                });
            });
        });
      });

    //   it('Book room', ()=>{

    //   });

  });
});
