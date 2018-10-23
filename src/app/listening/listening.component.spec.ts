import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningComponent } from './listening.component';

describe('ListeningComponent', () => {
  let component: ListeningComponent;
  let fixture: ComponentFixture<ListeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
