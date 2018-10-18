import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';

import { Note } from '../../models/note.model';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private noteDoc: AngularFirestoreDocument<Note>;
  currentUser: any;
  noteId: string;
  note: Note;
  note$: Observable<Note>;
  minNoteDueDate = new Date();

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    route.params.subscribe((params: Object) => this.noteId = params['id']);
  }

  ngOnInit() {
    this.noteDoc = this.afs.doc<Note>(`notes/${this.noteId}`);
    this.note$ = this.noteDoc.snapshotChanges().map(item => {
      const id = item.payload.id;
      const data = item.payload.data();
      return <Note>{ id, ...data };
    });
    this.note$.subscribe(noteItem => {
      this.note = noteItem;
    });

    this.auth.authState$.subscribe(user => {
      this.currentUser = user;
    });
  }

  async deleteNote() {
    const deletedNote = {...this.note};
    await this.noteDoc.delete();
    this.redirectToNotes(deletedNote);
  }

  navigateToPreviousPage() {
    this.router.navigate(['notes']);
  }

  removeDueDate() {
    this.noteDoc.update({
      // https://firebase.google.com/docs/firestore/manage-data/delete-data
      dueDate: firebase.firestore.FieldValue.delete()
    });
  }

  toggleNoteArchive(note) {
    this.noteDoc.update({
      archived: !note.archived
    });
  }

  updateNoteDueDate(event: MatDatepickerInputEvent<Date>) {
    this.noteDoc.update({
      dueDate: event.value
    });
  }

  updateNoteDescription(e) {
    if (e.target.value.trim().length) {
      this.noteDoc.update({
        description: e.target.value
      });
    }
  }

  updateNoteTitle(e) {
    if (e.target.value.trim().length) {
      this.noteDoc.update({
        title: e.target.value
      });
    }
  }

  private async redirectToNotes(note: Note) {
    await this.router.navigate(['notes']);
    this.snackBar.open(`"${note.title}" deleted successfully 👋`, null, { duration: 2000 });
  }
}
