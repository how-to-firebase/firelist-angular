import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth.guard';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteAddComponent } from './components/note-add/note-add.component';
import { NoteComponent } from './components/note/note.component';
import { NoteCollaboratorsComponent } from './components/note-collaborators/note-collaborators.component';
import { NotesGeolocationComponent } from './components/notes-geolocation/notes-geolocation.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notes/geolocation',
    component: NotesGeolocationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notes/add',
    component: NoteAddComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'note/:id',
    component: NoteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'note/:id/collaborators',
    component: NoteCollaboratorsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
