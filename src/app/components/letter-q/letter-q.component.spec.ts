import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterQComponent } from './letter-q.component';

describe('LetterQComponent', () => {
  let component: LetterQComponent;
  let fixture: ComponentFixture<LetterQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
