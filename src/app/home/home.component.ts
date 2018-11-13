import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService} from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.UserService.getAll().pipe(first()).subscribe(users => {this.users = users;});
    //User service returns a stream of observables. Each item being an array of users
    //We take the first array of Users and dubscribe to it in order to use the values therein.
  }

}
