import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAstuceComponent } from './one-astuce.component';

describe('OneAstuceComponent', () => {
  let component: OneAstuceComponent;
  let fixture: ComponentFixture<OneAstuceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneAstuceComponent]
    });
    fixture = TestBed.createComponent(OneAstuceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
