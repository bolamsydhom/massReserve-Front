import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MassService } from './mass.service';



@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: MassService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.isAuthendicated();

  }
}
