import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';



// Services
import { WeatherServices } from './core/weather.services';
import { AlertAreaService } from './services/alert-area.service';
import { AreaDetailsService } from './services/area-details.service';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'Main',pathMatch:'full'},
   
     {path:'Main',component:MainComponent},
     {path:'alertdetails/:area', component:DetailsComponent},
     
     

   ])
    
   
  ],
  providers: [AlertAreaService,AreaDetailsService,
    WeatherServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
