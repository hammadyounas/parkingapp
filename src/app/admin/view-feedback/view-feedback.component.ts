import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../provider/chat.service";

@Component({
  selector: 'view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {
  state = 'view';
  userArr = [];
  arr = [];
  temp = 'true';
  userkey;
  nameobj: {userkey: any, username: any};
  obj: {userkey: any, name: any,msg: any, type: any}
  constructor(
    private _chatService: ChatService
  ) {
    this.state = 'view';
    this.getchat();
   }
  getchat(){
    this._chatService.allChatProvide().subscribe(data=>{
      this.userArr = [];
      console.log(data);
      data.forEach(element => {
         this.nameobj =  {userkey: {}, username: {}};
        console.log(element.key);
        element.forEach(value => {
          if(value.val().name != 'admin'){
          console.log(element.key);
          this.nameobj.userkey = element.key;
          this.nameobj.username = value.val().name;
          console.log(value.val().name);
          }
        });
        this.userArr.push(this.nameobj);
        console.log(this.userArr);
        
        
      });
    })
    console.log(this.state);
    
  }
  chat(key){
    console.log(key);
    this.userkey = key;
    this._chatService.chatprovide(key).subscribe(data=>{
      this.state = 'showchat';
      this.arr = [];
      data.forEach(element => {
        
        this.arr.push(element.val());
        console.log(this.arr);
        
      });
    })
    
  }
  submit(ans){
    console.log(ans);
    console.log(this.userkey);
    this._chatService.adminReply(ans,this.userkey);
    
  }
  goback(){
     this.state = 'view';
  }

  ngOnInit() {
  }

}
