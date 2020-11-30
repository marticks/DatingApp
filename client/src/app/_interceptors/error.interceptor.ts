import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) { // para la mayoria de los casos lo casas en los switches y le aplicas un tratamiento y en el default tiras el error
            case 400:// este caso tiene toda esta logica complicada porque puede ser que te devuelva un arreglo con todas las validaciones uqe fallaste
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              }
              else if(typeof(error.error) === 'object'){
                this.toastr.error(error.statusText, error.status)
              } else{
                this.toastr.error(error.error, error.status)
              }
              break;
            case 404:
              this.router.navigateByUrl("/not-found")
              break;
            case 401:
              this.toastr.error(error.statusText, error.status)
              break;
            case 500:
              const navigationExtras : NavigationExtras = {state: {error: error.error}}
              this.router.navigateByUrl("/server-error",navigationExtras) //esto es para que ademas de dirigir envie que error captó al servidor(creo) 
              break;
            default:
              this,this.toastr.error("Something went wrong")
              console.log(error)
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
