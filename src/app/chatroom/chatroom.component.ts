import { Component, OnInit } from '@angular/core';
import { Icons } from '../Model/icons';
import { WebsocketService } from '../Service/websocket.service';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  listIconAlt:string[]=["🤩","😄","😌","😋","😏","😞","🙁","😒","😭","😘","😤","😡","🤬","🤢","🎃","🤑","🤒","😇","🤓","😥","🤭","🤤","🤧","🤮","🙄","👹","☠️","🤡","👿","👀","👩‍🏫","🙆‍","🧚","","","","","","","","","","","","","","","",""]
  ListIcon:Icons[]=[];
  public showicon:boolean=false;

  constructor(private websocket: WebsocketService) { }

  ngOnInit(): void {
    this.LoadIcon();
  }
  sendMessage(ele: HTMLInputElement){
    //tao the img
    let roomName=localStorage.getItem('roomName') as string;
    
    
    this.websocket.sendChatRoomToServer(ele.value,roomName);
    
     
    ele.value="";
}

addIcon(indexIcon: string | number): void {
  let x = document.getElementById("sendMessage") as HTMLInputElement;
  let img = document.getElementById("Imagenek") as HTMLImageElement;
  for (let i = 0; i < this.ListIcon.length; i++) {
    if (i == indexIcon) {
      img.alt = this.listIconAlt[i];
    }
  }
  console.log(img.alt);
  x.value += img.alt;
}

changeicon(): void {
  let sendicon = document.getElementById("sendMessage") as HTMLInputElement;
  let img = document.getElementById("ImgLike") as HTMLImageElement;
  
  if (sendicon.value != "") {
    console.log("Đã nhảy vào khác null");
    //btnek.innerText="Send";
    img.src="/assets/send.png";
  } else if(sendicon.value ===""){
    console.log("Null mât r");
   // btnek.innerText="";
    img.src = "/assets/like.png";
  //  img.src="assets/like.png";
    
  }
}
enableorDisableIcon():void{
  this.showicon=!this.showicon;
  //console.log(this.showicon);
}
hidden(){
  this.showicon=false;
}

LoadIcon(){
  for(let i=0;i<32;i++){
    this.ListIcon.push(new Icons(`assets/icon${i}.png`, this.listIconAlt[i]));
  }

}

}
