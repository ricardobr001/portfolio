import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstrucaoComponent } from './construcao.component';

describe('ConstrucaoComponent', () => {
  let component: ConstrucaoComponent;
  let fixture: ComponentFixture<ConstrucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstrucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
