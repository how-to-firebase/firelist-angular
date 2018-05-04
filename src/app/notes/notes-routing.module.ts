import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteAddComponent } from './components/note-add/note-add.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesListComponent,
  },
  {
    path: 'notes/add',
    component: NoteAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
