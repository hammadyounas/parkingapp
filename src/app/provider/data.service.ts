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
  chat: FirebaseListObservable<any>;
  deleteBooking: FirebaseListObservable<any>;

  uid;
  userType;
  slot = [
    'slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6', 'slot7', 'slot8', 'slot9', 'slot10', 'slot11',
    'slot12', 'slot13', 'slot14', 'slot15', 'slot16', 'slot17', 'slot18', 'slot19', 'slot20'
  ];
  userData: FirebaseObjectObservable<any>;
  userBooking: FirebaseListObservable<any>;
  userChat: FirebaseListObservable<any>;
  user: FirebaseObjectObservable<any>;
  constructor(
    private _authservice: AuthService,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.uid = this._authservice.getUserId();

  }
  users(): Observable<any> {
    this.userData = this.db.object('/userRegistration', { preserveSnapshot: true });
    return this.userData.map(data => {
      return data;
    })
  }


  pushslot(placeName, tempdate, startTime, endTime, reservehour, slotnum, placeAddress, userID) {
    var obj = [
      {
        date: tempdate, startTime: startTime, endTime: endTime, reserveHour: reservehour, slotNum: slotnum
      }
    ];
    this.pushobj = this.db.list('/bookings/' + placeName + '/' + userID)
    this.pushobj.push({ date: tempdate, startTime: startTime, endTime: endTime, reserveHour: reservehour, slotNum: slotnum, address: placeAddress }).then(data => {
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
  cancilBookings(value: any) {
    this.deleteBooking = this.db.list('/bookings/' + value.placekey + '/' + value.userkey, { preserveSnapshot: true });
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
  deleteUser(key) {
    this.user = this.db.object('/userRegistration/' + key, { preserveSnapshot: true });
    this.user.remove();
    for (var i = 0; i < 3; i++) {
      if (i == 0) {
        this.userBooking = this.db.list('/bookings/airport/', { preserveSnapshot: true });
        this.userBooking.remove(key);
      }
      else if (i == 1) {
        this.userBooking = this.db.list('/bookings/college/', { preserveSnapshot: true });
        this.userBooking.remove(key);
      }
      else if (i == 2) {
        this.userBooking = this.db.list('/bookings/hospital/', { preserveSnapshot: true });
        this.userBooking.remove(key);
      }

    }
    this.userChat = this.db.list('/chat/', { preserveSnapshot: true });
    this.userChat.remove(key);


 
  }
  getProfile(): Observable<any> {
    this.userData = this.db.object('/userRegistration/' + this.uid, { preserveSnapshot: true });
    return this.userData.map(user => {
      console.log(user.val());
      return user.val();
    })

  }

}
