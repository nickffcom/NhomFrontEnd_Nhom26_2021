import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../Service/websocket.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private ws: WebsocketService) { }

  ngOnInit(): void {
  }
  register(){ // bắt sự kiện khi ấn nút đăng ký từ (onclick)
    let Iusername=document.getElementById("username") as HTMLInputElement;
    let Ipassword=document.getElementById("password") as HTMLInputElement;
    let username=Iusername.value;
    let password=Ipassword.value;
    console.log(username+"--và--"+password);
    this.ws.RegisterToServer(username,password);

  }

}
