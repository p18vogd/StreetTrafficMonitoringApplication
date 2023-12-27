import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedLineComponent } from './speed-line.component';

describe('SpeedLineComponent', () => {
  let component: SpeedLineComponent;
  let fixture: ComponentFixture<SpeedLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedLineComponent]
    });
    fixture = TestBed.createComponent(SpeedLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
