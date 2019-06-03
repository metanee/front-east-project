import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListOldComponent } from './employee-list-old.component';

describe('EmployeeListOldComponent', () => {
  let component: EmployeeListOldComponent;
  let fixture: ComponentFixture<EmployeeListOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
