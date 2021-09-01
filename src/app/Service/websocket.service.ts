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
    
   }
   
  //historychat
  

    }


