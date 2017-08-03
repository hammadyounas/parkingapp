import { Component, OnInit } from '@angular/core';
import { AuthService } from '../provider/auth.service'
import { DataService } from "../provider/data.service";
//import { Router } from "@angular/router/router";
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //_authService: any;
  id;
  appstate = 'default';
  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
   // private router: Router
  ) {
    this.getdata()
  }
  getdata() {
    this._dataService.getProfile().subscribe(data => {
      console.log(data);
    });
  }
  ngOnInit() {
  }
  addUser() {
    this.appstate = 'adduser';
  }
  bookings() {
    this.appstate = 'bookings';
  }
  viewUser() {
    this.appstate = 'viewuser';
  }
  viewFeedback() {
    this.appstate = 'viewfeedback';
  }
  logout() {
    //this.id = this._authService.getUserId();
    //console.log('before logout');
    //console.log(this.id);
    this._authService.logout();
    // this.id = this._authService.getUserId();
    //console.log('after logout');
    //console.log(this.id);
  }
}
