import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalonServiceDialogComponent } from './update-salon-service-dialog.component';

describe('UpdateSalonServiceDialogComponent', () => {
  let component: UpdateSalonServiceDialogComponent;
  let fixture: ComponentFixture<UpdateSalonServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSalonServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSalonServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
