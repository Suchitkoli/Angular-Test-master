import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InterceptorService } from './services/loader/interceptor.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
    MatTableModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'Main',pathMatch:'full'},
   
     {path:'Main',component:MainComponent},
     
     {path:'alertdetails/:area', component:DetailsComponent},
     
     

   ])
    
   
  ],
  providers: [AlertAreaService,AreaDetailsService,
    WeatherServices,
    {provide: HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true }
  
  ],
  bootstrap: [AppComponent],
  exports:[MatExpansionModule,
    MatTableModule,
    MatButtonModule,MatSelectModule,FormsModule,MatGridListModule,MatProgressBarModule,MatProgressSpinnerModule]
})
export class AppModule { }
