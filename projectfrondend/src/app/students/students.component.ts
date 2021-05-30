import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/Students';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
public students:Student[]=[] ;
public code='';
public gender='';
public totalStudent:any;
public student: any;

  constructor(private common:CommonService, private serverHttp:ServerHttpService,private router:Router) { }

  ngOnInit(): void {
   this.loadData();
  }
  private loadData(){
    this.serverHttp.getStudents().subscribe((data => {
      this.students=data;
      console.log("Code",this.students);
      this.totalStudent=data.length;
     
    }));
  }
  public addStudent(){
    this.router.navigate(['student-form']);


  }
  public deleteStudent(studentId:any){
    console.log('student',studentId);
    // this.serverHttp.deleteStudent(student.id)
    this.serverHttp.deleteStudents(studentId).subscribe((data => {
      console.log("delete",data);
      this.loadData();
     
     
    }));

  }

}
