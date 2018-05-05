import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteAddComponent } from './components/note-add/note-add.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notes/add',
    component: NoteAddComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
