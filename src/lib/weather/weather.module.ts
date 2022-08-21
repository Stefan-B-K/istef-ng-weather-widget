import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ForecastComponent } from './forecast/forecast.component';


@NgModule({
  declarations: [
    ForecastComponent
  ],
  exports: [
    ForecastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class WeatherModule {}
