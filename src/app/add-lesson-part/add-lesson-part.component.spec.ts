import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonPartComponent } from './add-lesson-part.component';

describe('AddLessonPartComponent', () => {
  let component: AddLessonPartComponent;
  let fixture: ComponentFixture<AddLessonPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
