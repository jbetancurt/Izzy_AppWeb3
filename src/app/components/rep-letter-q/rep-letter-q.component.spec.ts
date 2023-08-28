import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepLetterQComponent } from './rep-letter-q.component';

describe('RepLetterQComponent', () => {
  let component: RepLetterQComponent;
  let fixture: ComponentFixture<RepLetterQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepLetterQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepLetterQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
