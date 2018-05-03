import { NgModule } from '@angular/core';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    MaterialModule,
    NotesRoutingModule
  ],
  declarations: [NotesListComponent]
})
export class NotesModule { }
