import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSearchFormComponent } from './bill-search-form.component';

describe('BillSearchFormComponent', () => {
  let component: BillSearchFormComponent;
  let fixture: ComponentFixture<BillSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
