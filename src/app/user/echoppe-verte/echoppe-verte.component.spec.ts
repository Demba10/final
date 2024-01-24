import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchoppeVerteComponent } from './echoppe-verte.component';

describe('EchoppeVerteComponent', () => {
  let component: EchoppeVerteComponent;
  let fixture: ComponentFixture<EchoppeVerteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchoppeVerteComponent]
    });
    fixture = TestBed.createComponent(EchoppeVerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
