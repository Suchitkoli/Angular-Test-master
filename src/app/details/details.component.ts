import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreaDetailsService } from '../services/area-details.service';
import { FetchdataService } from '../services/fetchdata.service';

//Defining Model
export class properties{
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

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
 
  areaCode: string;
  alertDetails=<details>{}
  getInfo: Array<properties> = new Array<properties>()
  selectedAlertType: string

  showSpinner=true
  count=0
  constructor(private activatedRoute: ActivatedRoute, private areadetails: AreaDetailsService, private fetdata: FetchdataService) { }

  ngOnInit() {
    
    //Getting Alert data from Main Component
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
        
        let alertInfo: properties = new properties();

        alertInfo.areaDesc = ele.properties.areaDesc;
        alertInfo.event = ele.properties.event;
        let zoneString = '';

        for (let zone of ele.properties.affectedZones) {
          zoneString = zoneString + zone + ","
        }
        alertInfo.affectedZones = zoneString;
        
        //Checking selected alert in Area
     if(alertInfo.event==this.selectedAlertType){
      this.getInfo.push(alertInfo); 
      console.log("Datasource",this.getInfo) 
      this.count++
     } 
        };
        if(this.count<=0){
            alert('Alert is not available in this area')
        }
          setTimeout(()=>{
            this.showSpinner=false
          },3000);
    });
   
     }
  //passing data to mat table
  displayedColumns: string[] = ['areaDesc', 'affectedZones', 'event'];
  dataSource=this.getInfo

}
