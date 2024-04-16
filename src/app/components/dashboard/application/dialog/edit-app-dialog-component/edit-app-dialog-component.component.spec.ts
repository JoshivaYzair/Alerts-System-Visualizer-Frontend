import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppDialogComponentComponent } from './edit-app-dialog-component.component';

describe('EditAppDialogComponentComponent', () => {
  let component: EditAppDialogComponentComponent;
  let fixture: ComponentFixture<EditAppDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAppDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
