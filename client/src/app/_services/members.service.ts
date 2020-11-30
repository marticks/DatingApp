import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl
  members: Member[] = [] // el agregado de esto creo que es para no tenes que pegarle devuelta al endpoint si ya tenes la data
  memberCache = new Map()
  userParams: UserParams
  user: User


  //tener cuidado de no inyectar el member service en el account service para no tener referencias circulares!
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'))
    if (response) {
      return of(response)
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize)
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + "users", params)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response)
        return response
      })
      )
  }


  getMember(username: string) {
    const member = [...this.memberCache.values()] //los 3 puntitos son un operador spread y permiten acceder a los componentes del arreglo
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username)
    //basicamente el reduce aplica la funcion que le pases a cada elemento del arreglo, 
    //entonces a cada uno lo coloco en un arreglo nuevo,
    //para tener un solo arreglo de elementos y no un arreglo de arreglos,el arr vacio es el valor inicial

    if (member) {
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + "users/" + username)
  }

  UpdateMember(member: Member) {
    return this.http.put(this.baseUrl + "users", member).pipe(map(
      () => {
        const index = this.members.indexOf(member)
        this.members[index] = member
      }
    ))
  }


  SetMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + "users/set-main-photo/" + photoId, {}) //como es un put necesitas mandar un body, asique lo mandas vacío
  }

  DeletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "users/delete-photo/" + photoId);
  }

  addLike(username:string){
    return this.http.post(this.baseUrl + "likes/" + username,{}) //el body vacio es porque el post lo requiere
  }

  getLikes(predicate:string,pageNumber:number,pageSize:number) // acá podría crear un objeto conteniendo los 3 paramentros
  {
    let params = this.getPaginationHeaders(pageNumber,pageSize);
    params = params.append("predicate",predicate);
    return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl + "likes" ,params);

    //método viejo return this.http.get<Partial<Member[]>>(this.baseUrl + "likes?predicate=" + predicate ) //parece que podría usar http params, capaz mas adelante los agrega
  }


  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>()
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })

    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    //if(this.members.length >0) return of(this.members); // con esto retornas como observable, que es lo que queres de un servicio
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params
  }


}
