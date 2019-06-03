import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserValidateEmployeeComponent } from './user-validate-employee.component';

describe('UserValidateEmployeeComponent', () => {
  let component: UserValidateEmployeeComponent;
  let fixture: ComponentFixture<UserValidateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserValidateEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserValidateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
