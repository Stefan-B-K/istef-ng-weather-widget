import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";


type OpenWeatherResponse = {
    list: {
        dt_txt: string,
        main: { temp: number }
    }[]
}

export type Forecast= {
    dateTime: string,
    temperature: number
}


@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    private url = 'https://api.openweathermap.org/data/2.5/forecast'

    constructor (private http: HttpClient) {}

    getCurrentLocation () {
        return new Observable<GeolocationCoordinates>((observer) => {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    observer.next(position.coords)
                    observer.complete()
                },
                err => observer.error(err)
            )
        })
    }
    // get every 8-th element from the OpenWeatherResponse list
 getForecast () {
        return this.getCurrentLocation()
            .pipe(
                map(coords => new HttpParams()
                    .set('lat', coords.latitude)
                    .set('lon', coords.longitude)
                    .set('units', 'metric')
                    .set('appid', '69089c4651b1b45ae2c4bfd2558437d5')
                ),
                switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
                map(res => res.list
                    .filter((el, index) => index % 8 === 0)
                    .map<Forecast>(el => ({
                        dateTime: el.dt_txt,
                        temperature: el.main.temp
                    }))
                )
            )
    }


}
