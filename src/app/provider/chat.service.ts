import { Injectable } from '@angular/core';
import {
  AngularFireDatabaseModule,
  FirebaseListObservable,
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class ChatService {
  uid;
  userType;
  userName;

  profile: FirebaseObjectObservable<any>
  chat: FirebaseListObservable<any>;
  userdata: FirebaseObjectObservable<any>
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private _authService: AuthService
  ) {
    this.uid = this._authService.getUserId();
    this.getuser();

  }
  getuser() {
    this.userdata = this.db.object('/userRegistration/' + this.uid, { preserveSnapshot: true });
    this.userdata.subscribe(data => {
      console.log(data.val());
      if (data.val().usertype == 'admin') {
        this.userType = 'admin';
        this.userName = data.val().name;
        console.log(this.userName);

        console.log(this.userType);

      }
      else if (data.val().usertype == 'user') {
        this.userType = 'user';
        this.userName = data.val().name;
        console.log(this.userName);
        console.log(this.userType);
      }
    })
  }
  adminReply(msgs, key) {
    this.chat = this.db.list('/chat/' + key);
    this.chat.push({ msg: msgs, usertype: this.userType, name: this.userName }).then(data => {
      console.log('push feedback');
    })
  }
  allChatProvide(): Observable<any> {
    this.chat = this.db.list('/chat/', { preserveSnapshot: true });
    return this.chat.map(data => {
      return data;
    })
  }
  chatprovide(userID): Observable<any> {
    this.chat = this.db.list('/chat' + '/' + userID, { preserveSnapshot: true });
    return this.chat.map(chatData => {
      return chatData;
    })
  }
  UserType(): Observable<any> {
    console.log(this.uid);

    this.profile = this.db.object('/userRegistration/' + this.uid, { preserveSnapshot: true });
    return this.profile.map(data => {
      console.log(data.val());
      return data.val();
    })
  }
  pushChat(userId, msgs) {
    console.log(userId);
    console.log(msgs);
    console.log(this.userType);
    this.chat = this.db.list('/chat/' + userId);
    this.chat.push({ msg: msgs, usertype: this.userType, name: this.userName }).then(data => {
      console.log('push feedback');
      this.router.navigateByUrl('/user/feedback');
    })
  }


}
