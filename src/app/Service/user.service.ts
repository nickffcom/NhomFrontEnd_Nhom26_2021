import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  setCurrentUser(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    //parse doi tuong sang string

  }
  getCurrentUser(): User | null {
    let object: any = localStorage.getItem("currentUser");
    let object2 = JSON.parse(object as any) as User;
    //chuyen string sang doi tuong
    if (object != null) {
      return object2;
    }
    return null;
  }
}
