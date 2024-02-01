import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceCreatifComponent } from './espace-creatif.component';

describe('EspaceCreatifComponent', () => {
  let component: EspaceCreatifComponent;
  let fixture: ComponentFixture<EspaceCreatifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceCreatifComponent]
    });
    fixture = TestBed.createComponent(EspaceCreatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
