import { Component, OnInit } from '@angular/core';
import { DataService } from "../../provider/data.service";

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  arr = [];
  obj: {userkey: any,Name: any, Email: any, Address: any, Number: any, uType: any};
  constructor(
    private _dataService: DataService
  ) {
    this.getData();
   }
  getData(){
    this._dataService.users().subscribe(snapshots=>{
      this.arr = [];
      snapshots.forEach(element => {
        console.log(element.key);
        //console.log(element.val());
        if(element.val().usertype != 'admin'){
          this.obj = {userkey: {},Name: {}, Email: {}, Address: {}, Number: {}, uType: {}};
          this.obj.userkey = element.key;
          this.obj.Name = element.val().name;
          this.obj.Email = element.val().email;
          this.obj.Number = element.val().number;
          this.obj.Address = element.val().address;
          this.obj.uType = element.val().usertype;
          this.arr.push(this.obj);
          //console.log(this.arr);
          
        }
      });
    })
  }
  deleteuser(array){
    ///console.log(array);
    this._dataService.deleteUser(array.userkey);
    
  }

  ngOnInit() {
  }

}
