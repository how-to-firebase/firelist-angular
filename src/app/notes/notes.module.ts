import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NoteAddComponent } from './components/note-add/note-add.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  imports: [
    MaterialModule,
    NotesRoutingModule,
    SharedModule
  ],
  declarations: [NotesListComponent, NoteAddComponent, NoteComponent]
})
export class NotesModule { }
