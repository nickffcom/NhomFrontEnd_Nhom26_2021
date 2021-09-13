import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../Model/friend';
import { TypeChat } from '../Model/typechat';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  url: string = "http://localhost:3000/account";
  constructor(private http: HttpClient) { }
  //lay list friend tu server
  getListFriend(): Observable<TypeChat[]> {
    return this.http.get<TypeChat[]>(this.url);
  }
  //lay list frind theo id
  getFriendWithID(id: any): Observable<TypeChat> {
    return this.http.get<TypeChat>(this.url + "/" + id);
  }

}