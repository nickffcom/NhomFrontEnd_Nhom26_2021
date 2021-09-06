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
   
   LoginToServer(username: string, password: string) {
    let data = {
      "action": "onchat",
      "data": {
        "event": "LOGIN",
        "data": {
          "user": username,
          "pass": password
        }
      }
    }
    // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!  
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
         
          this.checkRegister(statusRegister,msg.mes);
         break;
         case 'LOGIN':
          // let status: string = Object.values(msg)[2] as string;
          // let mes: string = Object.values(msg)[1] as string;
          let statuss=msg.status;
          console.log(msg);
          this.checkLogin(statuss,msg.mes);
          break;
        default:

      }

    }
    )};


    // hàm check satus register
    checkRegister(status:string,msg:string){
      if(status=="success"){
        alert("Bạn đã đăng kí thành công")
       this.router.navigate(['/login']);
      }else{
        alert("Lỗi: "+msg)

      }

    }
     
    checkLogin(status:string,msg:string){
      if(status=="success"){
        let username=localStorage.getItem('username') as string;
        let password=localStorage.getItem('password') as string;
        this.router.navigate(['/chatsolo']);
        let user: User = new User(username, password);
        //parse user thanh string de luu local
      this.userService.setCurrentUser(user);
      // localStorage.removeItem('username');
      // localStorage.removeItem('password');
       } else if (status == "error") {
        alert(""+msg)
        }

      }

    } // ngoặc kết thúc classss



