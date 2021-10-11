import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType } from '../core/models/alert-type.model';
import { Details } from '../core/models/AreaDetails.Model';
import { WeatherServices } from '../core/weather.services';
import { AlertAreaService } from '../services/alert-area.service';
import { AreaDetailsService } from '../services/area-details.service';
import { FetchdataService } from '../services/fetchdata.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit 
{
  alertTypes: AlertType[];
  alertArea=[]
  count=0
  selectedValue:string
  keyValue:string
  checkValue:number
  areaDisplay=[]
  showSpinner=true
  constructor(
     private weatherServices: WeatherServices , private area:AlertAreaService ,private router:Router,private fetchdata:FetchdataService,private areaDetail:AreaDetailsService) { }
  ngOnInit() 
  {
    this.weatherServices.getAlertTypes().subscribe(res => {
      this.alertTypes = res;
    });
    this.area.getalters().subscribe(message =>{
      this.alertArea=Object.keys(message["areas"])
    });

  }
  weatherEvent(selectedValue:string)
  {
    for(let i of this.alertArea)
    {
      this.areaDetail.getarea(i).subscribe((res:Details)=>
      {
        for(let object of res['features'])
        {
          if(selectedValue==object.properties.event)
          {
            for(let j of object.properties.geocode.UGC)
            {
              this.keyValue=j.substring(0,2) 
            }
          }
        }
      if(i==this.keyValue)
      {
        this.areaDisplay.push(i)
      }
      });  
    }
   console.log("value of new array",this.areaDisplay)
    this.fetchdata.sendMessage(selectedValue)
  }
  getAreaDetails(areaCode:string){
    this.router.navigate(['alertdetails',areaCode])
  }
}
