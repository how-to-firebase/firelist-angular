import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';

import { MaterialModule } from '../material.module';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NoteAddComponent } from './components/note-add/note-add.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteComponent } from './components/note/note.component';
import { TodosComponent } from './components/todos/todos.component';
import { NoteCollaboratorsComponent } from './components/note-collaborators/note-collaborators.component';
import { SharedWithComponent } from './components/shared-with/shared-with.component';
import { NotesGeolocationComponent } from './components/notes-geolocation/notes-geolocation.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    MaterialModule,
    NotesRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  declarations: [
    NotesListComponent,
    NoteAddComponent,
    NoteComponent,
    TodosComponent,
    NoteCollaboratorsComponent,
    SharedWithComponent,
    NotesGeolocationComponent
  ]
})
export class NotesModule { }
