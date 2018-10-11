import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWithComponent } from './shared-with.component';

describe('SharedWithComponent', () => {
  let component: SharedWithComponent;
  let fixture: ComponentFixture<SharedWithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedWithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
