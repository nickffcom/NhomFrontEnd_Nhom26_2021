import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../Service/websocket.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ws: WebsocketService,private router:Router) { }

  ngOnInit(): void {
  }
  //login 
   login(){
    let Iusername=document.getElementById("username") as HTMLInputElement;
    let Ipassword=document.getElementById("password") as HTMLInputElement;
    //
    let username=Iusername.value;
    let password=Ipassword.value;
    //
    localStorage.setItem('username',username);
    localStorage.setItem('password',password);
   
    this.ws.LoginToServer(username,password);
   }
   navigateRoom(){
    this.router.navigate(['/chatsolo']);

   }
 

}
