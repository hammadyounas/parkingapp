import { Component, OnInit } from '@angular/core';
import { DataService } from "../../provider/data.service";

@Component({
  selector: 'bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  obj: { placekey: any, userkey: any, bookingkey: any, address: any, date: any, endTime: any, reserveHour: any, slotNum: any, startTime: any };
 arr = [];
  constructor(
    private _dataService: DataService,
  ) { 
    this.getbookings();
  }
  getbookings(){
    this._dataService.Bookings().subscribe(user=>{
      
      this.arr = [];
      user.forEach(element => {
        console.log(element.key);
        element.forEach(snapshot => {
          console.log(snapshot.key);
          snapshot.forEach(slot => {
            this.obj = {placekey: {},userkey: {}, bookingkey: {} , address: {} ,
             date: {} , endTime: {} , reserveHour: {}, slotNum: {} , startTime: {}};
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
    });
  }
  cancil(value: any){
    console.log(value);
    this._dataService.cancilBookings(value);
    
  }

  ngOnInit() {
  }

}
