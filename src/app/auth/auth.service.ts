import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private authenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/tournament-list']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.authenticated = false;
      }
    });
  }

  logout() {

    this.afAuth.auth.signOut().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });

  }


  isAuth() {
    return this.authenticated;
  }

}
