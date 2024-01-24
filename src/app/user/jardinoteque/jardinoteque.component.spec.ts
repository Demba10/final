import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JardinotequeComponent } from './jardinoteque.component';

describe('JardinotequeComponent', () => {
  let component: JardinotequeComponent;
  let fixture: ComponentFixture<JardinotequeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JardinotequeComponent]
    });
    fixture = TestBed.createComponent(JardinotequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
