import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppDialogComponent } from './delete-app-dialog.component';

describe('DeleteAppDialogComponent', () => {
  let component: DeleteAppDialogComponent;
  let fixture: ComponentFixture<DeleteAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAppDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
