import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationAdminComponent } from './pagination-admin.component';

describe('PaginationAdminComponent', () => {
  let component: PaginationAdminComponent;
  let fixture: ComponentFixture<PaginationAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationAdminComponent]
    });
    fixture = TestBed.createComponent(PaginationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
