import { Controller, Get, Req, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.interface';
import { Request } from 'express';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async index(@Req() request: Request): Promise<Location[]> {
    return this.locationsService.index();
    // return request.url;
  }

  @Post()
  async create(@Req() request: Request){
      return this.locationsService.create(request.body);
  }
}
