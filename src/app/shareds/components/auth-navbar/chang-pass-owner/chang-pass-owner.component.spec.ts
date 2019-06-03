import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangPassOwnerComponent } from './chang-pass-owner.component';

describe('ChangPassOwnerComponent', () => {
  let component: ChangPassOwnerComponent;
  let fixture: ComponentFixture<ChangPassOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangPassOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangPassOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
