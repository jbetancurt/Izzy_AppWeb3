import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRefSearchComponent } from './client-ref-search.component';

describe('ClientRefSearchComponent', () => {
  let component: ClientRefSearchComponent;
  let fixture: ComponentFixture<ClientRefSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRefSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRefSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
