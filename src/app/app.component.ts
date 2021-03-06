import { Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck, OnInit {

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.loggedIn;
  }

  isLoggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authenticationService.loggedIn;
  }
}