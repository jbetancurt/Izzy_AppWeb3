import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedifaxExportComponent } from './medifax-export.component';

describe('MedifaxExportComponent', () => {
  let component: MedifaxExportComponent;
  let fixture: ComponentFixture<MedifaxExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedifaxExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedifaxExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
