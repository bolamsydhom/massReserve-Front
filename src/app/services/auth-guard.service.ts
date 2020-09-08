import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';



@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.isAuthendicated();

  }
}
