import { Component, OnInit } from '@angular/core';
import { DataService } from "../../provider/data.service";
import { AuthService } from "../../provider/auth.service";
import { ChatService } from "../../provider/chat.service";
import {
  FirebaseObjectObservable
} from 'angularfire2/database';



@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  uid;
  arr = [];
  ans;
  constructor(
    private _chatService: ChatService,
    private _authService: AuthService
  ) {
    this.uid = this._authService.getUserId();    
    this.getchat()
   }
  getchat(){
    this._chatService.chatprovide(this.uid).subscribe(data=>{
      this.arr = [];
      data.forEach(element => {
        console.log(element.val());
        
        this.arr.push(element.val());
      });
    })
  }


  ngOnInit() {
  }
  submit(){
    this._chatService.pushChat(this.uid,this.ans);
  }

}
