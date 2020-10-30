import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUlr = "http://localhost:5000/api/"
  private currentUserSource = new ReplaySubject<User>(1) //basicamente es un buffer y el valor es cuantos para atras queres almacenar
  //la convencion que termine con $ es para los observables
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }


  login(model: any) {
    return this.http.post(this.baseUlr + "account/login", model).pipe(map((response: User) => {
      const user = response
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        this.currentUserSource.next(user);
      }
    }))
  }

  register(model: any) {
    return this.http.post(this.baseUlr + "account/register", model).pipe(
      map((user:User) => {
          if(user){
            localStorage.setItem("user",JSON.stringify(user));
            this.currentUserSource.next(user)
          }
          //return user; si retornas esto podes obtener el usuario desde el componente con el que
          //invocas esta función
      }
    )
    )
  }


  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }


  logout() {
    localStorage.removeItem("user")
    this.currentUserSource.next(null)
  }

}
