import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWorkQComponent } from './process-work-q.component';

describe('ProcessWorkQComponent', () => {
  let component: ProcessWorkQComponent;
  let fixture: ComponentFixture<ProcessWorkQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessWorkQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessWorkQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
