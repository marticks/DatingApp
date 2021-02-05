import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsersWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles'); 
    //usas partial porque solo retorna algunas de las propiedades de los usuarios
  }


  updateUserRoles(username:string, roles: string[]){
    //el objeto vacio del final es el body del req, podrían ir las cosas ahi en vez de en el path...
    return this.http.post(this.baseUrl + "admin/edit-roles/" + username + '?roles=' + roles, {});
  }
}
