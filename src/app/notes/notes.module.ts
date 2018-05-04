import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NoteAddComponent } from './components/note-add/note-add.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

@NgModule({
  imports: [
    MaterialModule,
    NotesRoutingModule,
    SharedModule
  ],
  declarations: [NotesListComponent, NoteAddComponent]
})
export class NotesModule { }
