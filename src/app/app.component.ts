import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataSource} from '@angular/cdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  //dataSource: ExampleDataSource | null;
  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    })
  }
 // title = 'app-work';
}
