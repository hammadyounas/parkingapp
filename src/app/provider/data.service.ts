import { Injectable } from '@angular/core';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class DataService {
  slotobj: FirebaseObjectObservable<any>;
  pushobj: FirebaseListObservable<any>;
  deleteBooking: FirebaseListObservable<any>;
  uid;
  slot = [
    'slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6', 'slot7', 'slot8', 'slot9', 'slot10', 'slot11',
    'slot12', 'slot13', 'slot14', 'slot15', 'slot16', 'slot17', 'slot18', 'slot19', 'slot20'
  ];
  userData: FirebaseObjectObservable<any>
  constructor(
    private _authservice: AuthService,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.uid = this._authservice.getUserId();
  }
  pushslot(placeName, tempdate, startTime, endTime, reservehour, slotnum ,placeAddress , userID) {
    var obj = [
      {
        date: tempdate, startTime: startTime, endTime: endTime, reserveHour: reservehour, slotNum: slotnum
      }
    ];
    this.pushobj = this.db.list('/bookings/' + placeName + '/' + userID)
    this.pushobj.push({ date: tempdate, startTime: startTime, endTime: endTime, reserveHour: reservehour, slotNum: slotnum , address: placeAddress }).then(data => {
      console.log('slotbooked');
      alert('your parking has been booked :)');
      this.router.navigateByUrl('/user');


    })
  }
  Bookings(): Observable<any> {
    console.log('check bookings');

    this.pushobj = this.db.list('/bookings/', { preserveSnapshot: true });
    return this.pushobj.map(slot => {
      return slot
    })
  }
  cancilBookings(value: any){
    this.deleteBooking = this.db.list('/bookings/' + value.placekey + '/' + value.userkey,{preserveSnapshot: true});
    this.deleteBooking.remove(value.bookingkey);
  }

  slots(placeName): Observable<any> {
    console.log('check');

    this.slotobj = this.db.object('/bookings/' + placeName, { preserveSnapshot: true });
    return this.slotobj.map(slot => {
      console.log('service');
      console.log(slot);
      return slot;
    });
  }
  getProfile(): Observable<any> {
    this.userData = this.db.object('/userRegistration/' + this.uid, { preserveSnapshot: true });
    return this.userData.map(user => {
      console.log(user.val());
      return user.val();
    })

  }

}
