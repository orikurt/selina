import { IsNotEmpty, IsDateString } from 'class-validator';

export class RoomParams {
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @IsNotEmpty()
  @IsDateString()
  until: Date;
}

export class BookParams {
    @IsNotEmpty()
    @IsDateString()
    from: Date;
  
    @IsNotEmpty()
    @IsDateString()
    until: Date; 

    @IsNotEmpty()
    roomType: string;
}