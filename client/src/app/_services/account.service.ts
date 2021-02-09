import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUlr = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1) //basicamente es un buffer y el valor es cuantos para atras queres almacenar
  //la convencion que termine con $ es para los observables
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presenceService: PresenceService) { }


  login(model: any) {
    return this.http.post(this.baseUlr + "account/login", model).pipe(map((response: User) => {
      const user = response
      if (user) {
        this.setCurrentUser(user)
        this.presenceService.createHubConnection(user)
      }
    }))
  }

  register(model: any) {
    return this.http.post(this.baseUlr + "account/register", model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user)
          this.presenceService.createHubConnection(user)
        }
      }
      )
    )
  }


  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;

    //esto del array es porque si tiene un solo rol no te lo devuelve como arreglo entonces 
    //con esto te aseguras de trabajar con un arreglo siempre
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles)

    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user)
  }


  logout() {
    localStorage.removeItem("user")
    this.currentUserSource.next(null)
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
  }

}
