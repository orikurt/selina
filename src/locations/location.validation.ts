import { IsNotEmpty } from 'class-validator';

export class LocationParams {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;
}
