import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';

import { AuthService } from './Service/auth.service';
import { ROUTES } from './app.routes';
import { FlightRegisterComponent } from './flight-register/flight-register.component';
import { FLightStatusComponent } from './flight-status/flight-status.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FlightService } from './Service/Flight-Service';
import { CityService } from './Service/City-Service';
import { AirlineService } from './Service/AirLine-Service';
import { CommonFunction } from './Service/Date-Service';
import { SearchPipe } from './Pipes/Search-Pipe';
import { AuthGuardComponent } from './auth-gaurd';
import { UnsavedchangesGuardService } from './unsavedchangescheck-gaurd';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    FlightRegisterComponent,
    FLightStatusComponent,
    NavigationComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService,
    FlightService,
    CityService,
    AirlineService,
    CommonFunction,
    SearchPipe,
    AuthGuardComponent,
    UnsavedchangesGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
