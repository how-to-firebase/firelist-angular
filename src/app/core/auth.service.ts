import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { FirebaseError } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

export enum AuthProviders {
  Github = 0,
  Twitter = 1,
  Facebook = 2,
  Google = 3,
  Password = 4,
  Anonymous = 5,
  Custom = 6
}

@Injectable()
export class AuthService {
  public user: firebase.User;
  public authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = null;
    this.authState$ = afAuth.authState;

    this.authState$.subscribe((user: firebase.User) => {
      this.user = user;
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : null;
  }

  signIn(providerId: number): Promise<void> {
    let provider: firebase.auth.AuthProvider = null;

    switch (providerId) {
      case AuthProviders.Github:
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case AuthProviders.Twitter:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case AuthProviders.Facebook:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case AuthProviders.Google:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
    }

    return firebase.auth()
      .signInWithPopup(provider)
      .then((result: firebase.auth.UserCredential) => {
        // The signed-in user info.
        this.user = result.user;
      }).catch((error: FirebaseError) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'authService/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
        }
        console.error('ERROR @ AuthService#signIn() :', error);
      });
  }

  signInWithGithub(): Promise<void> {
    return this.signIn(AuthProviders.Github);
  }

  signInWithTwitter(): Promise<void> {
    return this.signIn(AuthProviders.Twitter);
  }

  signInWithFacebook(): Promise<void> {
    return this.signIn(AuthProviders.Facebook);
  }

  signInWithGoogle(): Promise<void> {
    return this.signIn(AuthProviders.Google);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
