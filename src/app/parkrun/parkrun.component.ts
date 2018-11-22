import { Component, OnInit } from '@angular/core';
import { faArrowDown,faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { first } from 'rxjs/operators';

import { Parkrun } from '../_models';
import { DataService } from '../_services';
import { ParkrunPipe } from './parkrun.pipe';
import { GradePipe } from './grade.pipe';

@Component({
  selector: 'app-parkrun',
  templateUrl: './parkrun.component.html',
  styleUrls: ['./parkrun.component.css']
})

export class ParkrunComponent implements OnInit {

  constructor(private dataService: DataService) { 
      
  }
faArrowDown = faArrowDown;
faArrowUp = faArrowUp;
  parkruns: Parkrun[] = [];
  dateOrderAsc: boolean;

  ngOnInit() {
    // this.UserService.getAll().pipe(first()).subscribe(users => { this.users = users; });
    this.dataService.getAllParkruns().pipe(first()).subscribe(parkruns => { this.parkruns = parkruns });
    //User service returns a stream of observables. Each item being an array of users
    //We take the first array of Users and dubscribe to it in order to use the values therein.
    this.dateOrderAsc = true;
   }

  sortByDate() {
    if (this.dateOrderAsc) {
      this.parkruns.sort(this.compareRaceAsc);  
    }
    else {
      this.parkruns.sort(this.compareRaceDesc);  
    }
    this.dateOrderAsc = !this.dateOrderAsc;
  }

  compareRaceAsc(a: Parkrun, b: Parkrun) {
    if (a.race < b.race)
      return 1;
    if (a.race > b.race)
      return -1;
    return 0;
  }

  compareRaceDesc(a: Parkrun, b: Parkrun) {
    if (a.race < b.race)
      return -1;
    if (a.race > b.race)
      return 1;
    return 0;
  }


}
