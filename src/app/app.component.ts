import { Component, DoCheck } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements DoCheck {

  isLoggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authenticationService.loggedIn
  }
}