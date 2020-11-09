import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl
  members: Member[] = [] // el agregado de esto creo que es para no tenes que pegarle devuelta al endpoint si ya tenes la data

  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length >0) return of(this.members); // con esto retornas como observable, que es lo que queres de un servicio
    return this.http.get<Member[]>(this.baseUrl + "users").pipe(
      map( members => {
        this.members = members
        return members  
      }
    )) // hay que paramentrizar el tipo que retorna para que coincidan los tipos
  }

  getMember(username: string){
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member)
    return this.http.get<Member>(this.baseUrl + "users/" + username)
  }

  UpdateMember(member: Member){
    return this.http.put(this.baseUrl + "users" , member).pipe(map(
      () => {
        const index = this.members.indexOf(member)
        this.members[index] = member
      }
    ))
  }


  SetMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + "users/set-main-photo/" + photoId,{}) //como es un put necesitas mandar un body, asique lo mandas vacío
  }

  DeletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "users/delete-photo/" + photoId);
  }

}
