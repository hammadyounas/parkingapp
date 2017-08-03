import { Injectable } from '@angular/core';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
//import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class DataService {
  slotobj: FirebaseObjectObservable<any>;
  pushobj: FirebaseListObservable<any>
  uid;
  //tempobj: { uid: string , date: Date , startTime: string , endTime: string , reserveHour: number}
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
    //console.log(this.uid);
  }
  pushslot(placeName, tempdate, startTime, endTime, reservehour, slotnum) {
    var obj = [
      {
        date: tempdate, startTime: startTime, endTime: endTime, reserveHour: reservehour, slotNum: slotnum
      }
    ];
    this.pushobj = this.db.list('/bookings/' + placeName + '/' + this.uid)
    this.pushobj.push({ date: tempdate, startTime: startTime, endTime: endTime, reserveHour: reservehour, slotNum: slotnum }).then(data => {
      console.log('slotbooked');
      alert('your parking has been booked :)');
      this.router.navigateByUrl('/user');


    })
  }
  Bookings(): Observable<any> {
    console.log('check bookings');

    this.pushobj = this.db.list('/bookings/', { preserveSnapshot: true });
    return this.pushobj.map(slot => {
      // console.log(slot);
      return slot
      // slot.forEach(snapshots => {
      //   console.log(snapshots.key);
      //   snapshots.forEach(element => {
      //     console.log(element.val());
      //     if(this.uid == element.key){
      //     return element.val();
      //     }
      //     // if (element.key == this.uid) {
      //     //   console.log(element.key);
      //     //   return element;
      //     // }
      //   });

      // });
    })
  }

  slots(placeName): Observable<any> {
    console.log('check');

    this.slotobj = this.db.object('/bookings/' + placeName, { preserveSnapshot: true });
    return this.slotobj.map(slot => {
      console.log('service');
      console.log(slot);
      return slot;
    });
    //const auth = firebase.auth();
    // for(var i=0; i<20; i++){
    //  // console.log('check loop');

    // this.slotobj = this.db.object('/bookings/'+placeName +'/'+ this.slot[i]);
    // this.slotobj.set(placeName)
    // }
    // this.slotobj = this.db.object('/bookings/' + placeName + '/slot10' ,{preserveSnapshot: true});
    // this.slotobj.subscribe(snapshots=>{
    //   //console.log(snapshots.val());
    //   snapshots.forEach(element => {
    //     console.log(element.val());
    //   });
    // })

  }
  getProfile(): Observable<any> {
    this.userData = this.db.object('/userRegistration/' + this.uid, { preserveSnapshot: true });
    return this.userData.map(user => {
      console.log(user.val());
      return user.val();
    })

  }

}
