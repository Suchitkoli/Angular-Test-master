import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertAreaService {
  url='https://api.weather.gov/alerts/active/count'

  constructor(private httpclient:HttpClient) { }

  getalters(){
  
      return this.httpclient.get(this.url)
    
      
  }
}
