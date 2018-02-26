import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Flight } from '../Model/Flight-Model';
import { FlightService } from '../Service/Flight-Service';
import { CityService } from '../Service/City-Service';
import { AirlineService } from '../Service/AirLine-Service';
import { AppValidators } from '../App-Validators';
import { AppError } from '../Error-Handling/App-Error';
import { CityModel } from '../Model/City-Model';
import { AirlinesModel } from '../model/Airline-Model';

@Component({
  selector: 'app-flight-register',
  templateUrl: './flight-register.component.html',
  styleUrls: ['./flight-register.component.css']
})
export class FlightRegisterComponent implements OnInit {

  // Flight instance
  flightModel: Flight = new Flight;
  // Decalring the form group
  form: FormGroup;
  // Flag to show the success messsage on storng the flight details
  showMessage = false;
  // CityList Array
  cityList: CityModel[] = [];
  // Airline list Array
  airlineList: AirlinesModel[] = [];
  // Dummy Cities
/*  cities: Array<string> = [
    'Lagos',
    'Mumbai',
    'New York',
    'London',
    'Nairobi'
  ];
  // Dummy Airlines
  airlines: Array<string> = [
    'Air Asia',
    'Indigo',
    'Spice Jet',
    'Jet Airlines',
    'Kingfisher'
  ];
*/
/* constructor using dependency injection to build the form, to make use of FlightService
   to make use of CityService and AirlineService 
*/
  constructor(private formBuilder: FormBuilder,
    private _flightService: FlightService,
    private _cityService: CityService,
    private _airlineService: AirlineService
  ) {
    // Initializing the form
      this.initializeModel();
  }
  ngOnInit() {
    // invoke the city service to get city list
    this._cityService.getCityList().subscribe(
      (cityList: CityModel[]) => {
        this.cityList = cityList;
      },
      (error: AppError) => {
        console.log('error:', error);
      }
    );

    // invoke the airline service to get city list
    this._airlineService.getAirlineList().subscribe(
      (airlineList: AirlinesModel[]) => {
        this.airlineList = airlineList;
      },
      (error: AppError) => {
        console.log('error:', error);
      }
    );
   }

   // building the form with necessary validators
initializeModel() {
  this.form = this.formBuilder.group(
    {
      fullName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z ]+'), Validators.minLength(6)])],
      from: ['', Validators.compose([Validators.required])],
      to: ['', Validators.compose([Validators.required])],
      type: ['', Validators.required],
      departure: ['', Validators.compose([Validators.required])],
      arrival: ['', Validators.compose([Validators.required])],
      Airlines: ['', Validators.required],
      time: ['', Validators.required]
    },
  {
    // custom validators
    validator: Validators.compose([AppValidators.locationMatch('from', 'to'), AppValidators.dateMatch('departure', 'arrival')])
  }
);
}
// on submit get the values from form and call the flightService to store the details
  handleSubmit(value) {
    this.flightModel.fullName = value.fullName;
    this.flightModel.from = value.from;
    this.flightModel.to = value.to;
    this.flightModel.type = value.type;
    this.flightModel.departure = value.departure;
    this.flightModel.Airlines = value.Airlines;
    this.flightModel.time = value.time;

    console.log(this.flightModel);

    this._flightService.storeFlight(this.flightModel).subscribe(
      (flight: Flight) => {
        console.log('Flight stored successfully');
      },
    (error: AppError) => {
      console.log('error', error);
  });
  // show the success message for 5 secs
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
}
// reset the form to its default values
reset() {
  this.form.reset();
}
// handing the abrupt navigation using the canDeactivate gaurd
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.flightModel
    ) {
      return confirm('Are you sure you don’t want to save the data ?');
    } else {
      return true;
    }
}
}
