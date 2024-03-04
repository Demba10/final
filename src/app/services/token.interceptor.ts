import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    // Récupérer le token JWT depuis le service d'authentification
    const token = this.tokenService.getToken();

    // Cloner la requête et ajouter le token JWT aux en-têtes de la requête clonée
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(clonedRequest);

      return next.handle(clonedRequest);
    } else {
      // Si aucun token n'est disponible, simplement poursuivre la requête d'origine
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          Swal.fire({
            text: 'Connectez-vous pour effectuer cette action',
            timer: 8000,
            showCancelButton: true,
            confirmButtonText: 'Se connecter',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['./auth'])
            } else if (result.dismiss === Swal.DismissReason.cancel) {

            }
          });
        }
        return throwError(error);
      })
    )
  }
}
export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}