import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Injectable({ //como no es un componente le tenes que dar el operador Inyectable
    providedIn: 'root' 
})
export class MemberDetailedResolver implements Resolve<Member> {

    constructor(private memberService: MembersService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.memberService.getMember(route.paramMap.get('username'));
        // no es necesario suscribirse dentro de los resolvers, el router se encarga de la suscripcion y la desuscripcion
    }

} 