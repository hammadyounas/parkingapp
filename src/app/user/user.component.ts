import { Component, OnInit } from '@angular/core';
import { AuthService } from '../provider/auth.service';
import { DataService } from "../provider/data.service";
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  appstate = 'default';
  constructor(
    private _authService: AuthService,
    private _dataService: DataService
  ) { 
    this.seedata()
  }
  seedata(){
    // this._dataService.getProfile().subscribe(data=>{
    //   console.log('data here');
      
    //   console.log(data);
    // })
  }

  ngOnInit() {
  }
  profile(){
    this.appstate = 'profile';
  }
  bookParking(){
this.appstate = 'bookparking';
  }
  viewBooking(){
this.appstate = 'viewbooking';
  }
  feedback(){
    this.appstate = 'feedback';
  }
  logout(){
   // this.id = this._authService.getUserId();
   // console.log('before logout');
    //console.log(this.id);
    this._authService.logout();
   // this.id = this._authService.getUserId();
    //console.log('after logout');
   // console.log(this.id);
  }

}
