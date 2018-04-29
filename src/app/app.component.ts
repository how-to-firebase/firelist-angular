import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

export interface Link {
  name: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('newLinkName') newLinkName: ElementRef;
  @ViewChild('newLink') newLink: ElementRef;

  title = 'Firelist ⚡';
  links$: Observable<Link[]>;
  linksRef: AngularFireList<Link>;

  constructor(db: AngularFireDatabase) {
    this.linksRef = db.list<Link>('links');
    this.links$ = this.linksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  async addLink(newName: string, url: string) {
    const linkNameInput = this.newLinkName.nativeElement;
    const linkUrlInput = this.newLink.nativeElement;

    if ( linkNameInput.value && linkUrlInput.value ) {
      const newLink: Link = { name: newName, url };
      await this.linksRef.push(newLink);

      linkNameInput.value = '';
      linkUrlInput.value = '';
    }
  }

  deleteLink(key: string) {
    this.linksRef.remove(key);
  }
}
