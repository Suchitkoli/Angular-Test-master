import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AreaDetailsService {
  areaurl:string='https://api.weather.gov/alerts/active/area/'
  constructor(private httpclient:HttpClient) { }

  getarea(pas:string){

    return this.httpclient.get(this.areaurl+pas)

  }



}
