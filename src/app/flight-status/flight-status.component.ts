import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Flight } from '../Model/Flight-Model';
import { FlightService } from '../Service/Flight-Service';
import { SearchPipe } from '../Pipes/Search-Pipe';

@Component({
  selector: 'app-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.css'],
  providers: [SearchPipe]
})
export class FLightStatusComponent implements OnInit {

  // decaration of flight array
  FlightList: Flight[];

  flights: Flight[];
// to handle images
  flightPath: string;
  arrivalIcon: string;
  departureIcon: string;
  timeIcon: string;
  // flags to store the state of flight
  flightStatus: boolean;
  errorState: boolean;
  // search data to search the flight based on the airlines
  searchData: string;

  // initializing the image path and invoking the flightservcie using constructor dependency injection
  constructor(private _flightService: FlightService) {
    this.flightPath = 'assets/flight.png';
    this.arrivalIcon = 'assets/Arrival.png';
    this.departureIcon = 'assets/departure.jpg';
    this.timeIcon = 'assets/time.png';
   }
// initializing the searchDate on init and invoking th getFlights method to get the flight list
  ngOnInit() {
    this.searchData = '';
   this.getFlights();
  }
// getFlights method, retuns the flight list and checks the flight status 
  getFlights(): void {
    this._flightService.getFlightList().subscribe(res => {
      this.FlightList = res;
      for (let i = 0; i < this.FlightList.length; i++) {
      this.errorState = false;
      this.errorState = this._flightService.checkDate(this.FlightList[i]);
      if (this.errorState) {
        this.FlightList[i].status = 'Yet to Departure';
      } else {
        this.FlightList[i].status = 'The Flight Arrived ago';
     }
    }
  },
    error => console.log('Error ', error)
    );
  }
  }


