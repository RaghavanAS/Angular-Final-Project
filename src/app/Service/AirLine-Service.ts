import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AirlinesModel } from '../Model/Airline-Model';
import { AppError } from '../Error-Handling/App-Error';

@Injectable()
export class AirlineService {
   // AirlineList URL
    private apiURL = 'http://localhost:3000/AirlinesList';

    constructor(private http: Http) { }

    // returns the city list
    getAirlineList(): Observable<AirlinesModel[]> {
        return this.http
            .get(this.apiURL)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    // error handling
    private handleError(error: Response) {
        return Observable.throw(new AppError(error));
    }
}