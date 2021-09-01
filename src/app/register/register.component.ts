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


}
