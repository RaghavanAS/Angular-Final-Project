import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  // handling authentication using the authService
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
  ngOnInit() {
  }
}
