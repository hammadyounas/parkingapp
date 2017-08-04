import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../provider/chat.service";

@Component({
  selector: 'view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {
  state;

  constructor(
    private _chatService: ChatService
  ) {
    this.getchat();
   }
  getchat(){
    this._chatService.allChatProvide().subscribe(data=>{
      console.log(data);
      data.forEach(element => {
        //console.log(element.val());
        element.forEach(value => {
          console.log(value.val());
          
        });
        
      });
    })
  }

  ngOnInit() {
  }

}
