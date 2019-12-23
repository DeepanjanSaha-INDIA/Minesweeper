import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDialogBoxComponent } from './result-dialog-box.component';

describe('ResultDialogBoxComponent', () => {
  let component: ResultDialogBoxComponent;
  let fixture: ComponentFixture<ResultDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
