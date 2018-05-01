import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  async connectWithGoogle() {
    await this.auth.signInWithGoogle();
    this.redirectAfterAuth();
  }

  async connectWithFacebook() {
    await this.auth.signInWithFacebook();
    this.redirectAfterAuth();
  }

  async connectWithTwitter() {
    await this.auth.signInWithTwitter();
    this.redirectAfterAuth();
  }

  async connectWithGithub() {
    await this.auth.signInWithGithub();
    this.redirectAfterAuth();
  }

  private redirectAfterAuth(): void {
    this.router.navigate(['/']);
  }
}
