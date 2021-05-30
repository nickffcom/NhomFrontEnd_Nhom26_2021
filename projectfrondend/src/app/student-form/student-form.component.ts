import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../model/Students';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  public studentForm = new FormGroup({
    id : new FormControl(''),
    code: new FormControl(''),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl(''),
  });

  constructor(private common:CommonService, private serverHttp:ServerHttpService,private router:Router) { }

  ngOnInit(): void {
  }
  public onSubmit(){
    alert('ok');
    // console.log(this.profileForm)
    // console.log("name "+this.profileForm.controls.name.value)
    // console.log("age "+this.profileForm.controls.age.value)
    const  newStudent: any = {}; 

    for(const controlName in this.studentForm.controls){
      if(controlName){
        // console.log(controlName +'='+this.studentForm.controls[controlName].value);
        newStudent[controlName]=this.studentForm.controls[controlName].value;

      }
    }
    console.log(newStudent);
    //add len json
    this.serverHttp.addtStudents(newStudent).subscribe((data)=>{
      console.log("DATAne",data);
      this.router.navigate(['students']);

    }); 
  }

}
