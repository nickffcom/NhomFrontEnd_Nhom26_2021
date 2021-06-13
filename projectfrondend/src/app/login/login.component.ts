import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServerHttpService } from '../Service/server-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public studentForm2 = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
  });
  constructor(
    private serverHttp:ServerHttpService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  public username2='';
  public password2='';
  public accounene(){
    this.serverHttp.getAccount().subscribe((data)=>{
      for (var val of data) {
         if(val.username==this.username2 && this.password2==val.password){
           alert('dang nhap thanh cong');
           this.router.navigate(['viewpage']);
         

         }
        
      
      }
    });
  }
  public onSubmit(

  ){
  }
}



