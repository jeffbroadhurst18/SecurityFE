import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { Parkrun } from '../_models';
import { DataService} from '../_services';

@Component({
  selector: 'app-parkrun',
  templateUrl: './parkrun.component.html',
  styleUrls: ['./parkrun.component.css']
})

export class ParkrunComponent implements OnInit {

  constructor(private dataService: DataService) { }

  parkruns: Parkrun[] = [];

  ngOnInit() {
   // this.UserService.getAll().pipe(first()).subscribe(users => { this.users = users; });
    this.dataService.getAllParkruns().pipe(first()).subscribe(parkruns => {this.parkruns = parkruns});
    //User service returns a stream of observables. Each item being an array of users
    //We take the first array of Users and dubscribe to it in order to use the values therein.
  }

}
