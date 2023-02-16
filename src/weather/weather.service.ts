import { HttpService } from '@nestjs/axios/dist';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import  {PrismaService} from '../prisma/prisma.service';
import {History, Prisma} from '@prisma/client';

@Injectable()
export class WeatherService {
    constructor(private readonly httpService: HttpService,private prisma: PrismaService){}

    async getWeatherByCity(city: string): Promise<any> {
        const s = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+process.env.API_KEY;
        const {data}:any = await firstValueFrom(this.httpService.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=be5d8aecaf85cbaf6a0609ce7af95247').pipe(catchError(e => {
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
