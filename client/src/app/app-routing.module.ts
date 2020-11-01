import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: "",component: HomeComponent},
  {//de esta manera meto a todos para las mismas comprobaciones
    path:"",
    runGuardsAndResolvers: "always",
    canActivate:[AuthGuard],
    children:[
      {path: "members/:id",component: MemberDetailComponent},
      {path: "lists",component: ListsComponent},
      {path: "messages",component: MessagesComponent},
    ]
  },
  {path: "members",component: MemberListComponent,canActivate:[AuthGuard]},// esta es una manera, con esto proteges este solo

  {path: "**",component: HomeComponent,pathMatch: "full"} 
  //wildard, si flasho lo mandas a home, es necesario el path match para que matchee con toda la url
  //(basicamente lo necesitas para la ruta default)
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
