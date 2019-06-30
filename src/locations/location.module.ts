import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationSchema } from './location.schema';
import { RoomSchema } from 'src/rooms/room.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }]),
      MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])
],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}