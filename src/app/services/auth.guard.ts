import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private  userService: UsersService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        const isAuth = this.userService.isAuth;
        if (isAuth) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          reject(false);
        }
      }
    );
  }
}
