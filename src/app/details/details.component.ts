import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


import { AreaDetailsService } from '../services/area-details.service';
import { FetchdataService } from '../services/fetchdata.service';
import { LoaderService } from '../services/loader/loader.service';

export interface properties{
  areaDesc: String
  affectedZones: string;
  event: string
}

export interface features{
  properties:properties
}

export interface details{
  features:features[]
}




export class AlertInfo {
  areaDesc: String
  affectedZones: string;
  event: string
}
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   Alerts: AlertInfo[]
// }

// let ELEMENT_DATA: AlertInfo[];

// let ELEMENT_DATA: AlertInfo[] = [
// ]; 

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
 
  areaCode: string;
  dataArray: any[] = [];
  alertDetails=<details>{}
  getproperties=<details>{}
  getMethod:Array<details> = new Array<details>()
  getInfo: Array<AlertInfo> = new Array<AlertInfo>()
  selectedAlertType: string
  showSpinner=true

  
 

  constructor(private activatedRoute: ActivatedRoute, private areadetails: AreaDetailsService, private fetdata: FetchdataService) { }

  ngOnInit() {

    this.fetdata.getMessage().subscribe(message => {
      console.log("Print Message", message)
      this.selectedAlertType = message

    });

    this.activatedRoute.paramMap.subscribe(param => {
      this.areaCode = param.get('area');
    });


   


    // getting the data of this.areaCode
    this.areadetails.getarea(this.areaCode).subscribe((response:details) => {
      console.log("Areas ", response  ) ;

      this.alertDetails=response ;
      console.log("AlertDeatials", this.alertDetails)
    
      //Iteration and Object Creation
      for (let ele of  this.alertDetails['features']) {
        
        let alertInfo: AlertInfo = new AlertInfo();

        alertInfo.areaDesc = ele.properties.areaDesc;
        alertInfo.event = ele.properties.event;
        let zoneString = '';

        for (let zone of ele.properties.affectedZones) {
          zoneString = zoneString + zone + ","
        }
        alertInfo.affectedZones = zoneString;
        this.getInfo.push(alertInfo);
        
        };



        setTimeout(()=>{
          this.showSpinner=false
        },3000)

       
        
    })

    console.log("Datasource", this.getInfo)
    // ELEMENT_DATA = this.getInfo;
    // this.alertDetails.pipe(
    //   tap(items => console.log(items)),
       
    // )

    
    
  }
 

  //passing data to mat table
  displayedColumns: string[] = ['areaDesc', 'affectedZones', 'event'];

  dataSource=this.getInfo


}
