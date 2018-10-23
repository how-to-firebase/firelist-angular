import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Note } from '../../models/note.model';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html'
})
export class NoteAddComponent implements OnInit {
  currentUser: any;
  isLoading: boolean;
  note: Note;
  noteForm: FormGroup;
  today: Date = new Date();
  private notesCollection: AngularFirestoreCollection<Note>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.noteForm = fb.group({
      title: ['', Validators.required ],
      description: '',
      dueDate: ['', { disabled: true }],
      location: ''
    });
   }

  ngOnInit() {
    this.notesCollection = this.afs.collection<Note>('notes');
    this.auth.authState$.subscribe(user => {
      this.currentUser = user;
    });
  }

  async onSubmit() {
    if (this.noteForm.valid) {
      this.isLoading = true;
      this.note = this.prepareSaveNote();
      const docRef = await this.notesCollection.add(this.note);

      this.redirectToNote({id: docRef.id, title: this.note.title});
    }
  }

  prepareSaveNote(): Note {
    const userDoc = this.afs.doc(`users/${this.currentUser.uid}`);
    const formModel = this.noteForm.value;

    const newNote = {
      completed: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userDoc.ref,
      owner: this.currentUser.uid,
      photoURL: this.currentUser.photoURL,
      isInvitaionFormEnabled: false,
      sharedWith: [{
        email: this.currentUser.email,
        photoURL: this.currentUser.photoURL,
        uid: this.currentUser.uid,
        owner: true
      }],
      collaborators: {
        [this.currentUser.email.replace(/\W/g, '')]: true
      }
    };

    return {...formModel, ...newNote};
  }

  private redirectToNote(doc: any): any {
    const snackBarRef = this.snackBar.open(`${doc.title} created successfully`, null, {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate([`note/${doc.id}`]);
    });
  }
}
