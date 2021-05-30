import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public name ='Hiep';  
  public age ;
  public vehicles=['Toyota','Honda','Nissan'];

  constructor(private common:CommonService) {
    this.age=common.age;
   }

  ngOnInit(): void {
  }
  public tangTuoi(){
   this.common.age++;
   this.age=this.common.age;
    // if (this.age===20) {
    //   this.name='Cristiano Ronaldo';
      
    // }
   this.vehicles.push(this.name+':'+this.age);
  };

}