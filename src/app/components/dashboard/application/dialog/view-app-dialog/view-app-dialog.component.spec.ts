import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppDialogComponent } from './view-app-dialog.component';

describe('ViewAppDialogComponent', () => {
  let component: ViewAppDialogComponent;
  let fixture: ComponentFixture<ViewAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
