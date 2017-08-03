import { Component, OnInit } from '@angular/core';
import { DataService } from "../../provider/data.service";
import { AuthService } from "../../provider/auth.service";

@Component({
  selector: 'view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  displayedColumns = ['Date', 'Time', 'ReserveHour', 'slotNumber'];
  uid;
  arr = [];
  //dataSource;
  constructor(
    private _dataService: DataService,
    private _authService: AuthService
  ) {
    this.uid = this._authService.getUserId();
    this.getbookings();
   }
  getbookings(){
    this._dataService.Bookings().subscribe(user=>{
      user.forEach(element => {
        console.log(element.key);
        element.forEach(snapshot => {
          console.log(snapshot.key);
          if(snapshot.key == this.uid)
          snapshot.forEach(slot => {
           console.log(slot.val());
           this.arr.push(slot.val());
          });
        });
      });
      console.log(this.arr);
      
      // user.forEach(snapshot => {
      //   console.log(snapshot.key);
      // });
    });
  }

  ngOnInit() {
  }

}
