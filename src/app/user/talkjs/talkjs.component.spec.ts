import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkjsComponent } from './talkjs.component';

describe('TalkjsComponent', () => {
  let component: TalkjsComponent;
  let fixture: ComponentFixture<TalkjsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalkjsComponent]
    });
    fixture = TestBed.createComponent(TalkjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
