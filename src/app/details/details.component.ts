import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreaDetailsService } from '../services/area-details.service';
import { FetchdataService } from '../services/fetchdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  areaCode:string;
  alertDetails:any
  newArray:any
  getproperties=[]
  getInfo=[]
  objkey:any
  objval:any
  arr=[]
  selectedAlertType:string
  Info:Array <any>=new Array()
  constructor(private activatedRoute: ActivatedRoute,private areadetails:AreaDetailsService,private fetdata:FetchdataService) { }

  ngOnInit() {
  
    this.fetdata.getMessage().subscribe(message => {
      console.log("Print Message",message)
        this.selectedAlertType=message
       
     });

    this.activatedRoute.paramMap.subscribe(param=>{
      this.areaCode=param.get('area');
    });


    //getting the data of this.areaCode
    this.areadetails.getarea(this.areaCode).subscribe(response =>{
      console.log("Areas ",response);
      
      this.alertDetails=response
      this.newArray=this.alertDetails
      console.log("New Array",this.newArray)
    for(let i of this.newArray.features){
      console.log("Value of features",i.properties.areaDesc)
      this.getInfo.push(i.properties)
      console.log("Get Info ",this.getInfo)
      this.getproperties.push(i.properties.areaDesc)
      console.log("getproperties",this.getproperties)
     
     
    }

    for(let i of this.getInfo){
      console.log("Value of I::-",i)
      this.arr.push(i)

    }
    var arr1=Object.entries(this.arr).map(([type,value])=>({type,value}))

    console.log("Value of arr::--",arr1)
  //   for(let i of this.getproperties)
  //   {
  //     this.objval=Object.values(this.getproperties['areaDesc'])
  // }
    console.log("Obj value",this.objval)
    // for(let j of this.getInfo){
    //   console.log("Value of j::-", j.areaDesc)
    //   this.Info = this.getproperties.map(data =>({value:data.areaDesc, text:data.areaDesc}))
    
    // console.log("Information value", this.Info)
    // }
    const mapped = Object.keys(this.newArray).map(key => ({areaDesc: key, value: this.newArray[key]}));
    console.log("Mapped key",mapped)
  })
  
}
}
