import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Flight } from '../Model/Flight-Model';
import { AppError } from '../Error-Handling/App-Error';
import { CommonFunction } from './Date-Service';

@Injectable()
export class FlightService {

    // Flags
    flightDate;
    errorState = false;

    // FlightList API URL
    private apiURL = 'http://localhost:3000/FlightList';

    // Invoking the dateservice to get the current date and timestamp
    constructor(private http: Http, private _dateService: CommonFunction) {
        this.flightDate = this._dateService.getCurrentDate();
        // console.log(this.flightDate);
     }
    // return the FlightList
    getFlightList(): Observable<Flight[]> {
        return this.http
            .get(this.apiURL)
            .map((response: Response) => {
                return response.json(); })
            .catch(this.handleError);
    }

    // checks for the date of arrival and departure
checkDate(FlightsList: Flight): boolean {
    if (FlightsList.departure.substring(0, 4) > this.flightDate.substring(0, 4)) {
        return true;
    } else
        if (FlightsList.departure.substring(0, 4) === this.flightDate.substring(0, 4)) {
            if (FlightsList.departure.substring(5, 7) > this.flightDate.substring(5, 7)) {
                return  true;
            } else
                if (FlightsList.departure.substring(5, 7) === this.flightDate.substring(5, 7)) {
                    if (FlightsList.departure.substring(8, 10) > this.flightDate.substring(8, 10)) {
                        return true;
                    } else
                        if (FlightsList.departure.substring(8, 10) === this.flightDate.substring(8, 10)) {
                            if (FlightsList.time.substring(7, 9) === 'PM') {
                                if ((FlightsList.time.substring(0, 2) + 12) > this.flightDate.substring(11, 13)) {
                                    return true;
                                } else
                                    if ((FlightsList.time.substring(0, 2) + 12) === this.flightDate.substring(11, 13)) {
                                        if ((FlightsList.time.substring(3, 5)) > this.flightDate.substring(14, 16)) {
                                            return true;
                                        } else
                                            if (FlightsList.time.substring(7, 9) === 'AM') {
                                                if ((FlightsList.time.substring(0, 2)) > this.flightDate.substring(11, 13)) {
                                                    return true;
                                                } else
                                                    if ((FlightsList.time.substring(0, 2)) === this.flightDate.substring(11, 13)) {
                                                        if ((FlightsList.time.substring(3, 5)) > this.flightDate.substring(14, 16)) {
                                                            return true;
                                                        } else {
                                                            return false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

  // Stores the flight details to the API Url
    storeFlight(flight: Flight): Observable<Flight> {
        return this.http
            .post(this.apiURL, flight)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    // error handling
    private handleError(error: Response) {
        return Observable.throw(new AppError(error));
    }
}
