import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { FlightRegisterComponent } from './flight-register/flight-register.component';
import { FLightStatusComponent } from './flight-status/flight-status.component';
import { UnsavedchangesGuardService } from './unsavedchangescheck-gaurd';
import { AuthGuardComponent } from './auth-gaurd';

export const ROUTES: Routes = [
    { path: 'register', component: FlightRegisterComponent,
    canActivate: [AuthGuardComponent],
    canDeactivate:[UnsavedchangesGuardService] },
    { path: 'status', component: FLightStatusComponent ,
        canActivate: [AuthGuardComponent] },
    { path: '', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: '' }
];
