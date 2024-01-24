import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheSectionComponent } from './recherche-section.component';

describe('RechercheSectionComponent', () => {
  let component: RechercheSectionComponent;
  let fixture: ComponentFixture<RechercheSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheSectionComponent]
    });
    fixture = TestBed.createComponent(RechercheSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
