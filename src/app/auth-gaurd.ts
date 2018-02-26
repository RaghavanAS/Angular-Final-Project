import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardComponent implements CanActivate {

    profile: any;
    constructor(private _router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('access_token')) {
            return true;
        } else {
            this._router.navigate(['/']);
            return false;
        }
    }
    }
