import { HttpService } from '@nestjs/axios/dist';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import  {PrismaService} from '../prisma/prisma.service';
import {History, Prisma} from '@prisma/client';
import { env } from 'process';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService,
        private prisma: PrismaService,
        private config: ConfigService){}

    async getWeatherByCity(city: string): Promise<any> {
        const {data}:any = await firstValueFrom(this.httpService.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+this.config.get<string>('WEATHER_API_KEY')).pipe(catchError(e => {
            throw new HttpException(e.response.data, e.response.status);
            })))
        const response = {
            city: data.name,
            temperature: (data.main.temp - 273.15).toFixed(2),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: (data.wind.speed* 3.6).toFixed(2),
            description: data.weather[0].description,
            // icon: data.weather[0].icon,
        }
        return response;
    }

    async createHistory(data: Prisma.HistoryCreateInput): Promise<History> {
        return this.prisma.history.create({
            data,
        });
    }

    async getHistory(params:{
        skip?: number;
        take?: number;
        cursor?: Prisma.HistoryWhereUniqueInput;
        where?: Prisma.HistoryWhereInput;
        orderBy?: Prisma.HistoryOrderByWithRelationInput;
    }): Promise<History[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.history.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async deleteHistory(where: Prisma.HistoryWhereUniqueInput): Promise<History> {
        return this.prisma.history.delete({
            where,
        });
    }
    

}
