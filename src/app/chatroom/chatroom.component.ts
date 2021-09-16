import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../Service/websocket.service';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  ngOnInit(): void {
  }
  sendMessage(ele: HTMLInputElement){
    //tao the img
    let roomName=localStorage.getItem('roomName') as string;
    
    
    this.websocket.sendChatRoomToServer(ele.value,roomName);
    
     
    ele.value="";





}

}
