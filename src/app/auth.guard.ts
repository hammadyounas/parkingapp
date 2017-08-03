import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './provider/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authService: AuthService,
    private afAuth: AngularFireAuth
  ) { }
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(authState => {
      if (!authState) this.router.navigate(['']);
      else if (authState.email != 'admin@dmin.com') { return authState != null; };
    });
  }
}
