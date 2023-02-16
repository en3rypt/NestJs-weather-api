import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService,PrismaService]
})
export class WeatherModule {}
