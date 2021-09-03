import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';
import { User } from '../Model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  wsUrl: string = 'ws://203.113.148.132:23023/chat/chat';
  private ws = webSocket(this.wsUrl);

  constructor(private router:Router,private userService:UserService) {
    this.getMessageFromServer();
   }
   RegisterToServer(username:string,password:string){
    let data={
      "action": "onchat",
      "data": {
        "event": "REGISTER",
        "data": {
          "user": username,
          "pass": password
        }
      }
      }
   this.ws.next(data);
   }
   
   getMessageFromServer() {
    this.ws.subscribe((msg:any)=>{
      // let event = Object.values(msg)[0]; 
      // bắt sự kiện từ sever mỗi khi có sự thay đổi trả về 
      let event=msg.event;
      console.log("Stt trả về là "+event);
      switch(event){
        case 'REGISTER':
          let statusRegister=msg.status;
         
          this.checkRegister(statusRegister);
         break;
        
        default:

      }

    }
    )};


    // hàm check satus register
    checkRegister(status:string){
      if(status=="success"){
        alert("Bạn đã đăng kí thành công")

      }else{
        alert("Tài khoản đã tồn tại "+status)

      }

    }


    } // ngoặc kết thúc classss



