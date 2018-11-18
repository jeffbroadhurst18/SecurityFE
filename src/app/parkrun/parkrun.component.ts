import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService} from '../_services';

@Component({
  selector: 'app-parkrun',
  templateUrl: './parkrun.component.html',
  styleUrls: ['./parkrun.component.css']
})
export class ParkrunComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
