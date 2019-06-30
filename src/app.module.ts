import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/location.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/selina', { useFindAndModify: false }),
    LocationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
