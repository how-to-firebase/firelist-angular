import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NoteAddComponent } from './components/note-add/note-add.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteComponent } from './components/note/note.component';
import { TodosComponent } from './components/todos/todos.component';
import { NoteCollaboratorsComponent } from './components/note-collaborators/note-collaborators.component';
import { SharedWithComponent } from './components/shared-with/shared-with.component';

@NgModule({
  imports: [
    MaterialModule,
    NotesRoutingModule,
    SharedModule
  ],
  declarations: [NotesListComponent, NoteAddComponent, NoteComponent, TodosComponent, NoteCollaboratorsComponent, SharedWithComponent]
})
export class NotesModule { }
