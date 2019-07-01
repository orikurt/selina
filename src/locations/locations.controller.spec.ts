import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { model } from 'mongoose';
import { LocationSchema } from './location.schema';
import { RoomSchema } from '../rooms/room.schema';

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  beforeEach(() => {
    locationsService = new LocationsService(model('Location', LocationSchema), model('Room', RoomSchema));
    locationsController = new LocationsController(locationsService);
  });

  describe('CRUD locations', async () => {

    it('succeeds create location', () => {
        locationsController.create({
            city: 'Mumbay',
            country: 'India'
        }).then((createdLocation)=>expect(createdLocation).toHaveProperty('_id'));
    });

    it('gets all locations', () => {
        locationsController.index().then(locations=>expect(locations).toHaveLength(1));
    })
  });
});
