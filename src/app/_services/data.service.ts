import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Parkrun } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAll() {
    var users = this.http.get<User[]>(`${config.apiUrl}/api/values`); //use $ syntax to do string substitution.
    return users;
  }

  getAllParkruns() {
    var runs = this.http.get<Parkrun[]>(`${config.apiUrl}/api/parkrun`);
    return runs;
  }
}
