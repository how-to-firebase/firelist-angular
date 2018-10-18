import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
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
    const email = e.target.value;
    if (email.trim().length) {
      const photoURL = `https://avatars.io/gravatar/${email}`;
      const collaborator: Collaborator = { email, photoURL};
      const collabEmailEscaped = email.replace(/\W/g, '');
      const collaborators  = {...this.note.collaborators, ...{[collabEmailEscaped]: true}};
      const sharedWith = this.note.sharedWith.concat(collaborator);

      await this.noteDoc.collection('collaborators').doc(`${collabEmailEscaped}`).set({
        email,
        photoURL,
        invitedBy: this.currentUser.uid
      });

      await this.noteDoc.update({
        collaborators,
        sharedWith
      });

      this.emailFormControl.reset();
    }
  }

  async deleteCollaborator(e, collab) {
    const sharedWith = [...this.note.sharedWith.filter(item => item.email !== collab.email)];

    // https://codeburst.io/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90
    const collabEmailEscaped = collab.email.replace(/\W/g, '');
    delete this.note.collaborators[collabEmailEscaped];
    const collaborators = {...this.note.collaborators};

    await this.noteDoc.collection('collaborators').doc(`${collabEmailEscaped}`).delete();
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
