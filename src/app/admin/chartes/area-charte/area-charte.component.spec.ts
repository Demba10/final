import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCharteComponent } from './area-charte.component';

describe('AreaCharteComponent', () => {
  let component: AreaCharteComponent;
  let fixture: ComponentFixture<AreaCharteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaCharteComponent]
    });
    fixture = TestBed.createComponent(AreaCharteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
