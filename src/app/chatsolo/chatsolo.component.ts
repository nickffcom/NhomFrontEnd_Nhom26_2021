import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend } from '../Model/friend';
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
  public user="";
  public ID:any;
  public check:boolean=false;
  url: string = "http://localhost:3000/listfriend";
  constructor(private userService:UserService, private friendlistService: FriendService,private route: ActivatedRoute,private websocket: WebsocketService) { }

  ngOnInit(): void {
   
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
      
     
      

      //focus
      
    
      console.log(this.ID+"__");
      //
      this.friendlistService.getFriendWithID(id).subscribe((data: Friend) => {
        this.friend = data;
        localStorage.setItem('friendName', this.friend.username);
        //them lich su chat
      
   //
      });
    })
  }
  //du lieu input
  sendMessage(ele: HTMLInputElement){
          //tao the img
      
    this.websocket.sendChatToServer(this.friend.username, ele.value);
  
    ele.value="";

   

  }
  getID(){
    let a =document.getElementById(this.ID) as HTMLElement;
    a.style.backgroundColor="silver";
    
    
  }
 
 

}
