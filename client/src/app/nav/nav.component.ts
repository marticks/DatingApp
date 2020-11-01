import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import {User} from "../_models/user"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  //la onda es inyectar el router como dependencia y poder hacer ruteo como funcionalidad
  constructor(public accountService: AccountService,private router: Router, 
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl("/members")
    }) // el metodo login retorna un observable entonces te tenes que suscribir
  }


  logout() {
    this.accountService.logout()
    this.router.navigateByUrl("/")
  }

}
