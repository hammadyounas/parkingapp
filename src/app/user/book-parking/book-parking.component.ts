import { Component, OnInit } from '@angular/core';
import { DataService } from "../../provider/data.service";
import { FirebaseObjectObservable } from 'angularfire2/database'

@Component({
  selector: 'book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  hour;
  freeSlots: FirebaseObjectObservable<any>;
  date;
  currentdate = new Date();
  maxDate = new Date(2020, 0, 1);
  currentFullDate;
  month;
  year;
  fullDate;
  startTime;
  endTime;
  slotNum = 10;
  reserveHour;
  address;
  times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  airportslots: { reserves: boolean, slotNum: number }[] = [
    { "reserves": true, "slotNum": 1 }, { "reserves": true, "slotNum": 2 }, { "reserves": true, "slotNum": 3 },
    { "reserves": true, "slotNum": 4 }, { "reserves": true, "slotNum": 5 }, { "reserves": true, "slotNum": 6 },
    { "reserves": true, "slotNum": 7 }, { "reserves": true, "slotNum": 8 }, { "reserves": true, "slotNum": 9 },
    { "reserves": true, "slotNum": 10 }, { "reserves": true, "slotNum": 11 }, { "reserves": true, "slotNum": 12 },
    { "reserves": true, "slotNum": 13 }, { "reserves": true, "slotNum": 14 }, { "reserves": true, "slotNum": 15 },
    { "reserves": true, "slotNum": 16 }, { "reserves": true, "slotNum": 17 }, { "reserves": true, "slotNum": 18 },
    { "reserves": true, "slotNum": 19 }, { "reserves": true, "slotNum": 20 }
  ];
  hospitalslots: { reserves: boolean, slotNum: number }[] = [
    { "reserves": true, "slotNum": 1 }, { "reserves": true, "slotNum": 2 }, { "reserves": true, "slotNum": 3 },
    { "reserves": true, "slotNum": 4 }, { "reserves": true, "slotNum": 5 }, { "reserves": true, "slotNum": 6 },
    { "reserves": true, "slotNum": 7 }, { "reserves": true, "slotNum": 8 }, { "reserves": true, "slotNum": 9 },
    { "reserves": true, "slotNum": 10 }, { "reserves": true, "slotNum": 11 }, { "reserves": true, "slotNum": 12 },
    { "reserves": true, "slotNum": 13 }, { "reserves": true, "slotNum": 14 }, { "reserves": true, "slotNum": 15 },
    { "reserves": true, "slotNum": 16 }, { "reserves": true, "slotNum": 17 }, { "reserves": true, "slotNum": 18 },
    { "reserves": true, "slotNum": 19 }, { "reserves": true, "slotNum": 20 }
  ];
  collegeslots: { reserves: boolean, slotNum: number }[] = [
    { "reserves": true, "slotNum": 1 }, { "reserves": true, "slotNum": 2 }, { "reserves": true, "slotNum": 3 },
    { "reserves": true, "slotNum": 4 }, { "reserves": true, "slotNum": 5 }, { "reserves": true, "slotNum": 6 },
    { "reserves": true, "slotNum": 7 }, { "reserves": true, "slotNum": 8 }, { "reserves": true, "slotNum": 9 },
    { "reserves": true, "slotNum": 10 }, { "reserves": true, "slotNum": 11 }, { "reserves": true, "slotNum": 12 },
    { "reserves": true, "slotNum": 13 }, { "reserves": true, "slotNum": 14 }, { "reserves": true, "slotNum": 15 },
    { "reserves": true, "slotNum": 16 }, { "reserves": true, "slotNum": 17 }, { "reserves": true, "slotNum": 18 },
    { "reserves": true, "slotNum": 19 }, { "reserves": true, "slotNum": 20 }
  ];
  selectstate = 'default';
  place = 'default';
  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
  }
  airport() {
    this.place = 'airport';
    this.selectstate = 'viewtime';
    this.address = 'Jinnah International Airport Karachi';
  }
  hospital() {
    this.place = 'hospital';
    this.selectstate = 'viewtime';
     this.address = 'Jinnah Hospital Karachi';
  }
  college() {
    this.place = 'college'
    this.selectstate = 'viewtime';
    this.address = 'DHA Sheikh Khalifa bin Zayed College';
  };

  submit(picker, hour, time) {
    console.log(picker);
    this.date = picker._selected.getDate();
    this.month = picker._selected.getMonth();
    this.year = picker._selected.getFullYear();
    this.fullDate = this.date + '/' + (this.month + 1) + '/' + this.year;
    console.log(this.currentdate.getDate());
    //this.currentFullDate = (this.currentdate.getMonth()+1) + '/' + this.currentdate.getDate()  + '/' + this.currentdate.getFullYear();
    //console.log('current date');
    //console.log(this.currentFullDate);
    console.log(this.fullDate);
    this.startTime = parseInt(time);
    this.endTime = this.startTime + hour;
    this.reserveHour = hour;
    // this._dataService.pushslot(this.place,this.fullDate,this.startTime,this.endTime,hour,this.slotNum);
    this._dataService.slots(this.place).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val())
        snapshot.forEach(element => {
          console.log(element.key);
          console.log(element.val().slotNum);
          if (this.fullDate == element.val().date) {
            console.log('if1');
            if (this.startTime == element.val().startTime) {
              console.log('if2');
              this.airportslots[element.val().slotNum].reserves = false;
            }
            else if (this.startTime != element.val().startTime) {
              console.log('if2');
              if ((element.val().startTime > this.startTime && this.endTime > element.val().startTime) || (element.val().startTime > this.startTime && this.endTime > element.val().endTime)) {
                console.log('if3');
                this.airportslots[(element.val().slotNum - 1)].reserves = false;
              }
            }
          }
        });
      });
      console.log('done');
      this.selectstate = 'selectslot';
    })
    //console.log(this.date);
    //console.log(this.month);
    //console.log(this.year);


    console.log(hour);
    console.log(time);
  }
  booked(Num) {
    console.log(Num);
    // console.log(this.fullDate);
    // console.log(this.startTime);
    // console.log(this.endTime);
    // console.log(this.reserveHour);
    console.log(Num);
    this._dataService.pushslot(this.place, this.fullDate, this.startTime, this.endTime, 
      this.reserveHour, Num , this.address);
  }
  goback() {
    this.selectstate = 'default';
  }
  notify() {
    alert('this slot has already booked!');
  }

}
