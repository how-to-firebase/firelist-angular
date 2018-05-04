import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html'
})
export class NotesListComponent implements OnInit {
  private notesCollection: AngularFirestoreCollection<Note>;
  notes$: Observable<Note[]>;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.notesCollection = this.afs.collection<Note>('notes');
    this.notes$ = this.notesCollection.snapshotChanges().map(actions => {
      return actions.filter(item => !item.payload.doc.data().archived)
                    .map(a => {
                      const data = a.payload.doc.data() as Note;
                      const id = a.payload.doc.id;
                      return { id, ...data };
                    });
    });
  }

}
