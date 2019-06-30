import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { model } from 'mongoose';
import { LocationSchema } from './location.schema';
import { RoomSchema } from '../rooms/room.schema';

describe('LocationsController', () => {
  global.Promise = jest.requireActual('promise');
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  beforeEach(async () => {
    locationsService = new LocationsService(model('Location', LocationSchema), model('Room', RoomSchema));
    locationsController = new LocationsController(locationsService);
  });

  describe('CRUD locations', () => {
    it('succeeds create location', async (done) => {
        const createdLocation = await locationsController.create({
            city: 'Mumbay',
            country: 'India'
        });
        return expect(createdLocation).toHaveProperty('_id');
    });

    it('gets all locations', async (done) => {
        await locationsController.create({
            city: 'Mumbay',
            country: 'India'
        });
        const locations = await locationsController.index();
        return expect(locations).toHaveLength(1);
    })
  });
});
