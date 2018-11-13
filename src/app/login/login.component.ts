
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    //get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; } //sets f as a property of this class

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]); //return URL is passed from AuthGuard and contains location of where you've come from.
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}
