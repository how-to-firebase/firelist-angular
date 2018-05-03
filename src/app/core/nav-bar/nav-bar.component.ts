import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: ['.toolbar-spacer { flex: 1 1 auto; } .emoji { height: 20px; position: relative; top: 2px; }']
})
export class NavBarComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  logout(evt: Event) {
    const message = 'You have been signed out';
    this.auth.signOut();
    this.router.navigate(['/auth']);
  }
}
