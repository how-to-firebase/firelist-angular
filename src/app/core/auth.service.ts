import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { FirebaseError } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  public user: firebase.User;
  public authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = null;
    this.authState$ = afAuth.authState;

    this.authState$.subscribe((user: firebase.User) => {
      this.user = user;

      console.log('authState$ changed', this.user);
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : null;
  }

  googleLogin() {
    const provider: firebase.auth.AuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
      .signInWithPopup(provider)
      .then((result: firebase.auth.UserCredential) => {
        this.user = result.user;
      }).catch((error: FirebaseError) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'authService/account-exists-with-different-credential') {
          console.log('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
        }
        console.error('ERROR @ AuthService#googleLogin() :', error);
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
