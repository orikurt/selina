import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.interface';
import { RoomParams, BookParams } from 'src/rooms/room.validation';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async index(): Promise<Location[]> {
    return this.locationsService.index();
  }

  @Get(':id/rooms')
  async findRooms(@Param() params, @Query() query: RoomParams){
    return this.locationsService.findRooms(params.id, query.from, query.until);
  }

  @Post(':id/rooms')
  async bookRoom(@Param() params, @Body() body: BookParams){
    console.log(body);
    const result = this.locationsService.bookRoom(params.id, body.roomType, body.from, body.until);
    console.log(result);
    return result;
  }
}
