import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

import { Note } from '../../models/note.model';
import { Collaborator } from '../../models/collaborator.model';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-note-collaborators',
  templateUrl: './note-collaborators.component.html'
})
export class NoteCollaboratorsComponent implements OnInit {
  currentUser: any;
  emailFormControl = new FormControl('');
  note: Note;
  note$: Observable<Note>;
  private noteId = '';
  private noteDoc: AngularFirestoreDocument<Note>;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((params: Object) => this.noteId = params['id']);
  }

  async ngOnInit() {
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

  async addCollaborator(e) {
    const email = e.target.value.trim();
    if (email.length) {
      const photoURL = `https://avatars.io/gravatar/${email}`;
      const collaborator: Collaborator = { email, photoURL, invitedBy: this.currentUser.uid };
      const collaborators = [...this.note.collaborators, ...[email]];
      const sharedWith = [...this.note.sharedWith, ...[collaborator]];

      await this.noteDoc.update({
        collaborators,
        sharedWith
      });

      this.emailFormControl.reset();
    }
  }

  async deleteCollaborator(collab) {
    const sharedWith = [...this.note.sharedWith.filter(item => item.email !== collab.email)];
    const collaborators = [...this.note.collaborators.filter(email => email !== collab.email)];

    await this.noteDoc.update({
      collaborators,
      sharedWith
    });
  }

  enableInvitationForm() {
    this.noteDoc.update({
      isInvitaionFormEnabled: true
    });
  }

  navigateBack() {
    this.router.navigate([`/note/${this.noteId}`]);
  }
}
