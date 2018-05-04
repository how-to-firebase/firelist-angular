import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../core/auth.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html'
})
export class NoteAddComponent implements OnInit {
  private notesCollection: AngularFirestoreCollection<Note>;
  currentUser: any;
  note: Note;
  noteForm: FormGroup;
  today: Date = new Date();
  isLoading: boolean;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.noteForm = fb.group({
      title: ['', Validators.required ],
      description: '',
      dueDate: ['', { disabled: true }],
      location: ''
    });
   }

  ngOnInit() {
    this.notesCollection = this.afs.collection<Note>(`notes`);
  }

  onSubmit() {
    if (this.noteForm.valid) {
      this.isLoading = true;
      this.note = this.prepareToSaveNote();
      this.notesCollection.add(this.note);

      this.router.navigate(['/notes']);
    }
  }

  private prepareToSaveNote(): Note {
    const formModel = this.noteForm.value;

    const newNote = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      owner: {
        id: this.auth.user.uid,
        photoURL: this.auth.user.photoURL
      }
    };

    return {...formModel, ...newNote};
  }

}
