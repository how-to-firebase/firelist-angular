import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MaterialModule } from '../material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CommonModule,
    MaterialModule
  ],
  declarations: [ NavBarComponent ],
  exports: [
    MaterialModule,
    NavBarComponent
  ],
  providers: [AuthService]
})
export class CoreModule { }
