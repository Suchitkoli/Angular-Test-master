import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Details, Properties } from '../core/models/AreaDetails.Model';
import { AreaDetailsService } from '../services/area-details.service';
import { FetchdataService } from '../services/fetchdata.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
 
  areaCode: string;
  alertDetails=<Details>{}
  getInfo: Array<Properties> = new Array<Properties>()
  selectedAlertType: string
  showSpinner=true
  count=0
  constructor(private activatedRoute: ActivatedRoute, private areadetails: AreaDetailsService, private fetdata: FetchdataService) { }

  ngOnInit() {
    
    //Getting Alert data from Main Component
    this.fetdata.getMessage().subscribe(message => {
      this.selectedAlertType = message
    });

    this.activatedRoute.paramMap.subscribe(param => {
      this.areaCode=param.get('area');
    });

    // getting the data of this.areaCode
    this.areadetails.getarea(this.areaCode).subscribe((response:Details) => {
      this.alertDetails=response ;
      
      //Iteration and Object Creation
      for (let ele of  this.alertDetails['features']) {
        
        let alertInfo: Properties = new Properties();
        
        alertInfo.areaDesc = ele.properties.areaDesc.split(';')+`\n`;
        alertInfo.event = ele.properties.event;
        let zoneString = '';

        for (let zone of ele.properties.affectedZones) {
          zoneString = zoneString + zone + "\n"
        }
        alertInfo.affectedZones = zoneString;
        
        //Checking selected alert in Area
     if(alertInfo.event==this.selectedAlertType){
      this.getInfo.push(alertInfo); 
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
  displayedColumns: string[] = ['areaDesc', 'affectedZones'];
  dataSource=this.getInfo

}
