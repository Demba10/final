import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJardinierComponent } from './details-jardinier.component';

describe('DetailsJardinierComponent', () => {
  let component: DetailsJardinierComponent;
  let fixture: ComponentFixture<DetailsJardinierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsJardinierComponent]
    });
    fixture = TestBed.createComponent(DetailsJardinierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
