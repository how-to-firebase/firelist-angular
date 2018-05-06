import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';

import { Note } from '../../models/note.model';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private noteDoc: AngularFirestoreDocument<Note>;
  noteId: string;
  note$: Observable<Note>;
  minNoteDueDate = new Date();

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
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
  }

  deleteNote() {
    this.noteDoc.delete().then(_ => {
      this.router.navigate(['/notes']);
    });
  }

  navigateToPreviousPage() {
    this.location.back();
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
}
