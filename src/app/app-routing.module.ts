import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
