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
  // crete room
  createRoom(roomName:string|null){
    let data={
      "action": "onchat",
      "data": {
      "event": "CREATE_ROOM",
      "data": {
      "name": roomName
     }
      }

    }
    this.ws.next(data);


  }
  // join room
  joinGroup(roomName:string|null){
    
    let data={ 
        "action": "onchat",
        "data": {
          "event": "JOIN_ROOM",
          "data": {
            "name": roomName
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
         
          this.checkRegister(statusRegister,msg.mes);
         break;
         case 'LOGIN':
          // let status: string = Object.values(msg)[2] as string;
          // let mes: string = Object.values(msg)[1] as string;
          let statuss=msg.status;
          console.log(msg);
          this.checkLogin(statuss,msg.mes);
          break;
          case 'CREATE_ROOM':
            // let status: string = Object.values(msg)[2] as string;
            // let mes: string = Object.values(msg)[1] as string;
           let status=msg.status;
           let nameRoom=msg.data.name;
           this.checkCreateRoom(status,nameRoom);
            break;
            case 'JOIN_ROOM':
              // let status: string = Object.values(msg)[2] as string;
              // let mes: string = Object.values(msg)[1] as string;
             let status2=msg.status;
             this.checkJoinRoom(status2);
              break;
          case 'SEND_CHAT':

             let r=msg.data.type;
             if(r==0){
              console.log("chat solo");
              let message = msg.data.mes;
              let name = msg.data.name;
              let namelocal = localStorage.getItem('friendName');
              
            
                if(namelocal==name){
                  console.log("@@");       
                  var linknode = document.createElement("p");
                var chat = document.getElementById("content__chat") as HTMLElement ;
                var minichat =document.getElementById("chatmini") as HTMLElement;
                minichat.innerHTML=message;
                linknode.style.alignSelf="flex-end";
                linknode.style.backgroundColor="#1877F2";
                linknode.style.borderRadius="50px";
                linknode.style.color="white";
                linknode.style.margin="0";
                linknode.style.marginTop="5px";
                linknode.style.padding="10px";
                linknode.style.fontSize="18px";
                linknode.innerHTML+=message+"<br>";
                chat.appendChild(linknode);

                }

             }
            break;
            
        
        default:
          

      }

    }
    )};


    // hàm check satus register
    checkRegister(status:string,msg:string){
      let noti = document.getElementById("notify-register") as HTMLElement;
      let icon = document.getElementById("title-icon") as HTMLElement;
      let titlenotify = document.getElementById("title-notify") as HTMLElement;
      let titlebody = document.getElementById("title-body") as HTMLElement;
      
      if(status=="success"){
        //alert("Bạn đã đăng kí thành công")
        noti.style.display="Block";
        noti.style.backgroundColor="#82c91e"; // màu xan
        titlenotify.innerText="Đăng Ký Thành Công";
        titlebody.innerText="Hãy Đăng Nhập Để Trải Nghiệm Ngay";
        noti.style.height="70px";
        icon.className="fas fa-check-circle";
        console.log("Đăng ký thành công"+msg);
        setTimeout(() => {
          noti.style.display="none";
          this.router.navigate(['/login']);
        }, 1111500);
       
      }else{
        console.log("Đăng ký thất bại");
        noti.style.display="Block"; 
        noti.style.backgroundColor="#df2938"; // màu đỏ df2938
        noti.style.borderLeftColor="Black";
        noti.style.height="70px";
        icon.className="fas fa-exclamation-triangle";  // icon thất bại
        titlenotify.innerText="Thất Bại ";
        titlebody.innerText=msg;  

        setTimeout(() => {
          noti.style.display="None";
          this.router.navigate(['/register']);
        }, 211000);
      
       

      }

    }
     
    checkLogin(status:string,msg:string){
      if(status=="success"){
        let username=localStorage.getItem('username') as string;
        let password=localStorage.getItem('password') as string;
        
        // 
        
        let successlogin=document.getElementById("dialog-success") as HTMLElement;
        successlogin.style.display="block";
        // this.router.navigate(['/chatsolo']);

        
        let user: User = new User(username, password);
        //parse user thanh string de luu local
      this.userService.setCurrentUser(user);
      // localStorage.removeItem('username');
      // localStorage.removeItem('password');
      
       } else if (status == "error") {
        alert(""+msg)
        }

      }
     
      checkCreateRoom(status:string,nameRoom:string){
        if(status=="success"){
         alert("Bạn đã tạo phòng thành công ");
         localStorage.setItem('roomName',nameRoom);
         this.router.navigate(['/chatroom']);
        }else{
          alert("Phòng này đã được tạo rồi");
        }
      }
      checkJoinRoom(status:string){
        if (status=="success") {
          this.router.navigate(['/chatroom']);
        } else {
          alert("Phòng này không tồn tại")
        }

      }
      sendChatToServer(friend: string, mess: string) {
        let data = {
          "action": "onchat",
          "data": {
            "event": "SEND_CHAT",
            "data": {
              "type": "people",
              "to": friend,
              "mes": mess
            }
          }
        };
      
          var linknode = document.createElement("p");
          var chat = document.getElementById("content__chat") as HTMLElement ;
          var minichat =document.getElementById("chatmini") as HTMLElement;
          minichat.innerHTML=mess;
          linknode.style.alignSelf="flex-start";
          linknode.style.backgroundColor="#CFD1D5";
          linknode.style.color="black"; 
          linknode.style.borderRadius="50px";
          linknode.style.margin="0";
          linknode.style.marginTop="5px";
          linknode.style.padding="10px";
          linknode.style.textAlign="center";
          linknode.style.fontSize="18px";
          linknode.innerHTML+="  <img src=\"../../assets/neymar4.jpg\" alt=\"\" style=\"width: 30px;height: 25px;border-radius: 50%;margin-right: 8px;\">"+mess+"<br>";
            chat.append(linknode);
        
       
        this.ws.next(data);
      }
      

    } // ngoặc kết thúc classss



