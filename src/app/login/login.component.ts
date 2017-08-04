import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../provider/auth.service'
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
import { DataService } from '../provider/data.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _dataService: DataService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: '',
    })
  }

  ngOnInit() {
  }
  submitform(value: any): void {
    localStorage.removeItem('firebaseToken');
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);

    let a = this._authService.login(this.loginForm.value.email, this.loginForm.value.password)
  }
  signup() {
    this.router.navigateByUrl('/signup');
  }

}
