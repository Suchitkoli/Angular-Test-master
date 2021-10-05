import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from '../core/models/alert-type.model';
import { WeatherServices } from '../core/weather.services';
import { AlertAreaService } from '../services/alert-area.service';
import { FetchdataService } from '../services/fetchdata.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  alertTypes: AlertType[];
  title = 'interview-app';
  alertArea=[]
  constructor( private weatherServices: WeatherServices , private area:AlertAreaService ,private router:Router,private fetchdata:FetchdataService) { }

  ngOnInit() {
    this.weatherServices.getAlertTypes().subscribe(res => {
      this.alertTypes = res;
    });
  
    this.area.getalters().subscribe(message =>{
      console.log(message)
      this.alertArea=Object.keys(message["areas"])
    });
  }
  selectedValue:string
  weatherEvent(selectedValue:string){
    // alert('selectteding the event :: '+ selectedValue)
    this.fetchdata.sendMessage(selectedValue)
  }

  getAreaDetails(areaCode:string){
    this.router.navigate(['alertdetails',areaCode])
  }

}
