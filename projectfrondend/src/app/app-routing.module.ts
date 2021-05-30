import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { ViewpageComponent } from './viewpage/viewpage.component';

const routes: Routes = [
 
  {path:"register",component:RegisterComponent},
  {path:"viewpage",component:ViewpageComponent},

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
