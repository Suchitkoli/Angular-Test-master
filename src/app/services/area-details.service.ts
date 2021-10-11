import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AreaDetailsService {
  areaUrl:string='https://api.weather.gov/alerts/active/area/'
  urlPass:string;
  constructor(private httpclient:HttpClient) { }

  getarea(pas:string){
    this.urlPass=this.areaUrl+pas
      return this.httpclient.get(this.urlPass)
  }

}
