import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  async connectWithGoogle() {
    await this.auth.googleLogin();
    this.router.navigate(['/']);
  }
}
