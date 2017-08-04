import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { DataService } from "./data.service";

 
@Injectable()
export class AuthService {
  authvalue;
  newob: FirebaseObjectObservable<any>
  profileData: FirebaseObjectObservable<any>
  usertype: FirebaseObjectObservable<any>
  authstate;
  checkstate;
  // userType;
  userId;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authstate = user;
        this.userId = this.authstate.uid;
        console.log(this.userId);
        console.log(this.authstate);
      }

    });
  }
  login(email, pass) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, pass)
      .then(user => {
        this.authvalue = user.uid;
        this.userId = user.uid;
        localStorage.setItem('firebaseToken', this.authvalue);
        this.finduser();
        console.log(this.authvalue);
        console.log('loged in');
      })

  }
  finduser() {
    console.log('check finduser');
    this.usertype = this.db.object('/userRegistration/' + this.userId, { preserveSnapshot: true });
    this.usertype.subscribe(data => {
      console.log(data.val());
      if (data.val().usertype == 'admin') {
        this.router.navigateByUrl('admin');
      }
      else if (data.val().usertype == 'user') {
        this.router.navigateByUrl('/user');
      }
    })
  }
  
  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('firebaseToken');
    this.router.navigateByUrl('');
  }
  signup(value): firebase.Promise<any> {
    const auth = firebase.auth();
    return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(user => {
        this.authstate = this.afAuth.auth.currentUser.uid;
        this.newob = this.db.object('/userRegistration/' + this.afAuth.auth.currentUser.uid);
        this.newob.set(value).then(data =>{
          this.finduser();
        });
      })
  }
  getUserId() {
    return this.userId;
  }


  getProfile(): Observable<any> {
    this.profileData = this.db.object('/userRegistration/' + this.userId, { preserveSnapshot: true });
    return this.profileData.map(user => {
      console.log(user.val());
      return user.val();
    })

  }
}
