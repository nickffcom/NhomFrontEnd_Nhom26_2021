import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend } from '../Model/friend';
import { Icons } from '../Model/icons';
import { TypeChat } from '../Model/typechat';
import { User } from '../Model/user';
import { FriendService } from '../Service/friend.service';
import { UserService } from '../Service/user.service';
import { WebsocketService } from '../Service/websocket.service';

@Component({
  selector: 'chatsolo',
  templateUrl: './chatsolo.component.html',
  styleUrls: ['./chatsolo.component.scss']
})
export class ChatsoloComponent implements OnInit {
  currentUser: User | null = null;
  friend: any;
  listFriend:TypeChat[]=[];
  listIconAlt:string[]=["🤩","😄","😌","😋","😏","😞","🙁","😒","😭","😘","😤","😡","🤬","🤢","🎃","🤑","🤒","😇","🤓","😥","🤭","🤤","🤧","🤮","🙄","👹","☠️","🤡","👿","👀","👩‍🏫","🙆‍","🧚","","","","","","","","","","","","","","","",""]
  ListIcon:Icons[]=[];

  public user="";
  public ID:any;
  public check:boolean=false;
  url: string = "http://localhost:3000/listfriend";
  constructor(private userService:UserService, private friendlistService: FriendService,private route: ActivatedRoute,private websocket: WebsocketService) { }
  public showicon:boolean=false;
  
  ngOnInit(): void {
   this.LoadIcon();
    //lay ten username de binding len html
    this.currentUser = this.userService.getCurrentUser();
     this.user=this.currentUser?.username as string;
    //  lay list friend de binding
     this.friendlistService.getListFriend().subscribe((data: TypeChat[]) => {
      this.listFriend = data;
    })
    //lay tenusername khi click
    this.route.paramMap.subscribe((params) => {
      //lay id nguoi chat
      let id = params.get('id');
      this.ID=id;
      console.log(this.ID+"__");
      //
      this.friendlistService.getFriendWithID(id).subscribe((data: Friend) => {
        this.friend = data;
        localStorage.setItem('friendName', this.friend.username);
        //them lich su chat
      });
    })
  }
  //du lieu input
  sendMessage(ele: HTMLInputElement){
    this.websocket.sendChatToServer(this.friend.username, ele.value);
    ele.value="";
  }
  getID(){
    let a =document.getElementById(this.ID) as HTMLElement;
    a.style.backgroundColor="silver";
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
  //tao room
  createGroup(){
    let roomname :any = prompt("Nhập tên phòng của bạn muốn tạo", '');
    
    
     this.websocket.createRoom(roomname);
  }
  joinGroup(){
    let roomname:any  = prompt("Nhập tên phòng mà bạn muốn tìm kiếm", '');
    this.websocket.joinGroup(roomname);
    localStorage.setItem('roomName',roomname);

}
   
    }
