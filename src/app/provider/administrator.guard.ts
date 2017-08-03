import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../provider/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class AdministratorGuard implements CanActivate {
   constructor(
    private router: Router,
    private _authService: AuthService,
    private afAuth: AngularFireAuth
  ) { }
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(authState => {
      if (!authState || authState.email != 'admin@admin.com') this.router.navigate(['']);
      return authState != null;
    });
  }
}
