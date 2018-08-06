import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { Location } from '@angular/common';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService, private location: Location) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authenticationService.getBearerToken();
    return this.authenticationService.isUserAuthenticated(token).then(data => {
      if (!data) {
        this.routerService.routeToLogin();
      }

      return data;
    });
  }
}
