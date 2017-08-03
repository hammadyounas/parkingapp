import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../provider/auth.service';
import { FirebaseObjectObservable} from 'angularfire2/database'

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   
  signupForm: FormGroup;
  service: FirebaseObjectObservable<any>
  constructor(private router: Router,
  private fb: FormBuilder,
  private _authService: AuthService
  ) { 
    this.signupForm = this.fb.group({
      'name': '',
      'email': '',
      'password': '',
      'number': '',
      'address': '',
      'usertype': 'user'
    })
  }

  ngOnInit() {
  }
  submitform(value: any){
   let a =  this._authService.signup(this.signupForm.value);
   this._authService.getUserId();
   console.log(a);
  }
  login(){
    this.router.navigateByUrl('');
  }

}
