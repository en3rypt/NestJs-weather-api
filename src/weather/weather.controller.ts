import { Controller,Delete,Get, Param, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { History as HistoryModel } from '@prisma/client';
@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}
    

    @Get("/history")
    async getHistory(): Promise<any> {
        return this.weatherService.getHistory({});
    }

    @Get("/history/:city")
    async getHistoryByCity(@Param('city') city:string):Promise<HistoryModel[]>{
        return this.weatherService.getHistory({
            where:{
                city:city
            }
        });
    }

    @Delete("/history/:id")
    async deleteHistory(@Param('id') id:number):Promise<HistoryModel>{
        return this.weatherService.deleteHistory({
            id:Number(id)

        });
    }
    

    @Get("/:city")
    async getWeather(@Param('city') city:string): Promise<any> {
        const response = await this.weatherService.getWeatherByCity(city);
        // if(data.code )
        if (response.cod == 200) {

        this.weatherService.createHistory({
            city,
            temperature:100,
            date:new Date()
        });
        }


        return response;
    }

    


}