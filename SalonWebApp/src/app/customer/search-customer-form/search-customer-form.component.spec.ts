import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerFormComponent } from './search-customer-form.component';

describe('SearchCustomerFormComponent', () => {
  let component: SearchCustomerFormComponent;
  let fixture: ComponentFixture<SearchCustomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCustomerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
