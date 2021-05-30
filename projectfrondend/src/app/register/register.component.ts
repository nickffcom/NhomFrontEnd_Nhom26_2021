import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerHttpService } from '../Service/server-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public studentForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
    repeat : new FormControl(''),
    
  });

  constructor(
    private serverHttp:ServerHttpService
    
  ) { }

  ngOnInit(): void {
    this.serverHttp.getAccount().subscribe((data)=>{
      console.log(data);

    });

  }
  public onSubmit(){
    const  newStudent: any = {}; 
    alert('dang ki thanh cong');
    // this.router.navigate(['login']);
    

    for(const controlName in this.studentForm.controls){
      if(controlName){
        newStudent[controlName]=this.studentForm.controls[controlName].value;
      }
    }
      console.log(newStudent);
      this.serverHttp.addtStudents(newStudent).subscribe((data)=>{
        console.log("DATAne",data);
        
  
      }); 
  }
  

}
