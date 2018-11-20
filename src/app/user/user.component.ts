import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { DataService } from '../_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private UserService: DataService) { }

  users: User[] = [];

  ngOnInit() {
    this.UserService.getAll().pipe(first()).subscribe(users => { this.users = users; }); //users is the data returned
    //User service returns a stream of observables. Each item being an array of users
    //We take the first array of Users and dubscribe to it in order to use the values therein.
  }

}
