import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnrollment } from './edit-enrollment';

describe('EditEnrollment', () => {
  let component: EditEnrollment;
  let fixture: ComponentFixture<EditEnrollment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEnrollment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEnrollment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
