import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { name: 'home' } },
  { path: 'user', component: UserComponent, data: { name: 'user' } },
  // { path: 'user/:id', component:  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }