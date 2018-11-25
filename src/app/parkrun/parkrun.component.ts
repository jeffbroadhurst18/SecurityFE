import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { first } from 'rxjs/operators';

import { Parkrun } from '../_models';
import { DataService } from '../_services';
import { ParkrunPipe } from './parkrun.pipe';
import { GradePipe } from './grade.pipe';
import { SortOrder } from './sort.order';

@Component({
  selector: 'app-parkrun',
  templateUrl: './parkrun.component.html',
  styleUrls: ['./parkrun.component.css']
})

export class ParkrunComponent implements OnInit {

  constructor(private dataService: DataService) {
    this.years = [2015, 2016, 2017, 2018];
  }
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  SortOrder = SortOrder; //so we can use in the template
  parkruns: Parkrun[] = [];
  sortOrder: SortOrder;
  choice: string;
  years: number[];
  year: number;

  ngOnInit() {
    this.dataService.getAllParkruns().pipe(first()).subscribe(parkruns => {
      this.parkruns = parkruns;
      this.addRank();
    });
    //Service returns a stream of observables. Each item being an array of runs
    //We take the first array of Runs and subscribe to it in order to use the values therein.
    this.sortOrder = SortOrder.race_desc;
    this.choice = "None";
  }

  filterByYear() {
    console.log(this.year);
    this.dataService.getParkrunsByYear(this.year.toString()).pipe(first()).subscribe(parkruns => {
      this.parkruns = parkruns;
      this.addRank();
    });
  }

  sortByRace() {
    if (this.sortOrder === SortOrder.race_asc) {
      this.sortOrder = SortOrder.race_desc;
    } else if (this.sortOrder === SortOrder.race_desc) {
      this.sortOrder = SortOrder.race_asc;
    } else {
      this.sortOrder = SortOrder.race_asc;
    }
    this.sortRows();
  }

  sortByPosition() {
    if (this.sortOrder === SortOrder.position_asc) {
      this.sortOrder = SortOrder.position_desc;
    } else if (this.sortOrder === SortOrder.position_desc) {
      this.sortOrder = SortOrder.position_asc;
    } else {
      this.sortOrder = SortOrder.position_asc;
    }
    this.sortRows();
  }

  sortByGrade() {
    if (this.sortOrder === SortOrder.grade_asc) {
      this.sortOrder = SortOrder.grade_desc;
    } else if (this.sortOrder === SortOrder.grade_desc) {
      this.sortOrder = SortOrder.grade_asc;
    } else {
      this.sortOrder = SortOrder.grade_asc;
    }
    this.sortRows();
  }

  sortByTime() {
    if (this.sortOrder === SortOrder.time_asc) {
      this.sortOrder = SortOrder.time_desc;
    } else if (this.sortOrder === SortOrder.time_desc) {
      this.sortOrder = SortOrder.time_asc;
    } else {
      this.sortOrder = SortOrder.time_asc;
    }
    this.sortRows();
  }

  sortRows() {
    switch (this.sortOrder) {
      case SortOrder.race_asc: {
        this.parkruns.sort(this.compareRaceAsc);
        break;
      }
      case SortOrder.race_desc: {
        this.parkruns.sort(this.compareRaceDesc);
        break;
      }
      case SortOrder.position_asc: {
        this.parkruns.sort(this.comparePositionAsc);
        break;
      }
      case SortOrder.position_desc: {
        this.parkruns.sort(this.comparePositionDesc);
        break;
      }
      case SortOrder.grade_asc: {
        this.parkruns.sort(this.compareGradeAsc);
        break;
      }
      case SortOrder.grade_desc: {
        this.parkruns.sort(this.compareGradeDesc);
        break;
      }
      case SortOrder.time_asc: {
        this.parkruns.sort(this.compareTimeAsc);
        break;
      }
      case SortOrder.time_desc: {
        this.parkruns.sort(this.compareTimeDesc);
        break;
      }
      default: {
        this.parkruns.sort(this.compareRaceAsc)
        break;
      }
    }
    this.addRank();
  }

  addRank() {
    for (var i = 0; i < this.parkruns.length; i++) {
      (this.parkruns[i]).rank = i + 1;
    }
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

  comparePositionAsc(a: Parkrun, b: Parkrun) {
    if (a.position < b.position)
      return 1;
    if (a.position > b.position)
      return -1;
    return 0;
  }

  comparePositionDesc(a: Parkrun, b: Parkrun) {
    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  }

  compareGradeAsc(a: Parkrun, b: Parkrun) {
    if (a.grade < b.grade)
      return 1;
    if (a.grade > b.grade)
      return -1;
    return 0;
  }

  compareGradeDesc(a: Parkrun, b: Parkrun) {
    if (a.grade < b.grade)
      return -1;
    if (a.grade > b.grade)
      return 1;
    return 0;
  }

  compareTimeAsc(a: Parkrun, b: Parkrun) {
    if ((a.minutes < b.minutes) || ((a.minutes === b.minutes) && (a.seconds < b.seconds)))
      return 1;
    if ((a.minutes > b.minutes) || ((a.minutes === b.minutes) && (a.seconds > b.seconds)))
      return -1;
    return 0;
  }

  compareTimeDesc(a: Parkrun, b: Parkrun) {
    if ((a.minutes < b.minutes) || ((a.minutes === b.minutes) && (a.seconds < b.seconds)))
      return -1;
    if ((a.minutes > b.minutes) || ((a.minutes === b.minutes) && (a.seconds > b.seconds)))
      return 1;
    return 0;
  }

}
