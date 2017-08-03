import { Component, OnInit } from '@angular/core';
import { DataService } from "../../provider/data.service";
import { AuthService } from "../../provider/auth.service";
import {DataSource} from '@angular/cdk';

@Component({
  selector: 'view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  //displayedColumns = ['Date', 'Time', 'ReserveHour', 'slotNumber'];
  uid;
  arr = [];
  obj: {placekey: any,userkey: any, bookingkey: any , address: any , date: any , endTime: any , reserveHour: any, slotNum: any , startTime: any  };
  constructor(
    private _dataService: DataService,
    private _authService: AuthService
  ) {
    this.uid = this._authService.getUserId();
    this.getbookings();
   }
  getbookings(){
    this._dataService.Bookings().subscribe(user=>{
      
      this.arr = [];
      user.forEach(element => {
        console.log(element.key);
        element.forEach(snapshot => {
          console.log(snapshot.key);
          if(snapshot.key == this.uid)
          snapshot.forEach(slot => {
            this.obj = {placekey: {},userkey: {}, bookingkey: {} , address: {} , date: {} , endTime: {} , reserveHour: {}, slotNum: {} , startTime: {}};
           //console.log(slot.val().date);
           this.obj.placekey = element.key;
           this.obj.userkey = snapshot.key;
           this.obj.bookingkey = slot.key;
           this.obj.address = slot.val().address;
           this.obj.date = slot.val().date;
           this.obj.endTime = slot.val().endTime;
           this.obj.reserveHour = slot.val().reserveHour;
           this.obj.slotNum = slot.val().slotNum;
           this.obj.startTime = slot.val().startTime;
           this.arr.push(this.obj);
          });
        });
      });
      console.log(this.arr);
      
      // user.forEach(snapshot => {
      //   console.log(snapshot.key);
      // });
    });
  }
  cancil(value: any){
    console.log(value);
    this._dataService.cancilBookings(value);
    
  }

  ngOnInit() {
  }

}