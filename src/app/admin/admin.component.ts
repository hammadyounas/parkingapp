import { Component, OnInit } from '@angular/core';
import { AuthService } from '../provider/auth.service'
import { DataService } from "../provider/data.service";
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  id;
  appstate = 'default';
  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
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
    this._authService.logout();
  }
}
