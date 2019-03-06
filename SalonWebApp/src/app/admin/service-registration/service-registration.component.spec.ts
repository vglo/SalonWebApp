import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegistrationComponent } from './service-registration.component';

describe('ServiceRegistrationComponent', () => {
  let component: ServiceRegistrationComponent;
  let fixture: ComponentFixture<ServiceRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
