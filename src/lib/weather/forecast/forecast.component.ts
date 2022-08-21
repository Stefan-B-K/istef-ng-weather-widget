import { Component, OnInit } from '@angular/core';
import { Forecast, WeatherService } from "../weather.service";
import { Observable } from "rxjs";

@Component({
    selector: 'istef-ng-weather',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

    weatherData$!: Observable<Forecast[]>;

    constructor (private weather: WeatherService) { }

    ngOnInit (): void {
        this.weatherData$ = this.weather.getForecast()
    }

}
