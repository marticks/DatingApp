import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
//los guards implementan el can activate que deciden si esa ruta puede ser accedida o no
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> { // los guards ya se suscriben a cualquier observable
    return this.accountService.currentUser$.pipe(map(user => {// como ya estamos suscriptos lo puedo usar de una y el pipe es para hacerle cambios
      if (user) return true;
      this.toastr.error("you can't access this section")
    }))
  }

}
