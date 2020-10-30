import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  
  
  
  constructor(private accountService: AccountService) {
    //Podría buscar la data acá pero se considera muy temprano, porque este es el método de construccion no el de startup
  }
  ngOnInit() {
    this.setCurrentUser()
  }

  setCurrentUser(){
    const user :User = JSON.parse(localStorage.getItem("user"))
    this.accountService.setCurrentUser(user);
  }
}
