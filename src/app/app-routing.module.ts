import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatsoloComponent } from './chatsolo/chatsolo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"chatsolo",component:ChatsoloComponent},
  {path:"chatroom",component:ChatroomComponent},
  {path:"chatsolo/:id",component:ChatsoloComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
