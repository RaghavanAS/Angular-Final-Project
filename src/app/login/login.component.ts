import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declarations
  profile: any;
  // constructor dependency injection using authservice
  constructor(public auth: AuthService) { }
// On init checking if the profile is active
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

  }
}
