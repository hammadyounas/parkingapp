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
  userId;
  // temp = {
  //   name: 'admin',
  //   email: 'admin@admin.com',
  //   password: '123456',
  //   number: '0312456789',
  //   address: 'h45',
  //   usertype: 'admin'
  // }
  //private _isLogin: boolean;
  //public _islogin: Observable<boolean>
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth,
    //private _dataService: DataService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authstate = user;
        this.userId = this.authstate.uid;
        console.log(this.userId);
        console.log(this.authstate);
        //this.finduser();
      }
      //this._isLogin = true;
      //console.log(this._isLogin);

      // this.isLogin;

    });
    //this.getUserId();
  }
  login(email, pass) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, pass)
      .then(user => {
        this.authvalue = user.uid;
        // console.log('userid');
        //console.log(user.uid);
        this.userId = user.uid;
        localStorage.setItem('firebaseToken', this.authvalue);
        this.finduser();
        //this.router.navigateByUrl('/place');
        console.log(this.authvalue);
        console.log('loged in');
      })

  }
  finduser() {
    console.log('check finduser');
    this.usertype = this.db.object('/userRegistration/' + this.userId, { preserveSnapshot: true });
    this.usertype.subscribe(data=>{
      console.log(data.val());
      if(data.val().usertype == 'admin'){
        this.router.navigateByUrl('admin');
      }
      else if(data.val().usertype == 'user'){
        console.log();
        
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
        //this.afAuth.auth.currentUser.uid
        this.newob = this.db.object('/userRegistration/' + this.afAuth.auth.currentUser.uid);
        this.newob.set(value);
      })
    // return this.afAuth.auth.createUserWithEmailAndPassword(this.temp.email,this.temp.password)
    // .then((user)=>{
    //   this.newob = this.db.object('/userRegistration/' + this.afAuth.auth.currentUser.uid);
    //   this.newob.set(this.temp);
    //   console.log('done admin');

    // });
    // console.log(value.name);
    // console.log(value.email);
    // console.log(value.password);
    // console.log(value.number);
    // console.log(value.address);
  }
  getUserId() {
    // return this.afAuth.authState.map(authState => {
    //   return authState.uid;
    // })
    //console.log('getuser');
    //console.log(this.userId);
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
