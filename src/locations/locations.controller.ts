import { Controller, Get, Post, Param, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.interface';
import { RoomParams, BookParams } from '../rooms/room.validation';
import { LocationParams } from './location.validation';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async index(): Promise<Location[]> {
    return this.locationsService.index();
  }

  @Post()
  async create(@Body() body: LocationParams): Promise<Location> {
    return this.locationsService.create(body);
  }

  @Get(':id/rooms')
  async findRooms(@Param() params, @Query() query: RoomParams){
    return this.locationsService.findRooms(params.id, query.from, query.until);
  }

  @Post(':id/rooms')
  async bookRoom(@Param() params, @Body() body: BookParams){
    const result = await this.locationsService.bookRoom(params.id, body.roomType, body.from, body.until);
    if (!result){
        throw new HttpException('No room available', HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
