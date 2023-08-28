import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLetterComponent } from './process-letter.component';

describe('ProcessLetterComponent', () => {
  let component: ProcessLetterComponent;
  let fixture: ComponentFixture<ProcessLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
