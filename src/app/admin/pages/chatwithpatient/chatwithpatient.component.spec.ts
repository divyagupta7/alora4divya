import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwithpatientComponent } from './chatwithpatient.component';

describe('ChatwithpatientComponent', () => {
  let component: ChatwithpatientComponent;
  let fixture: ComponentFixture<ChatwithpatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatwithpatientComponent]
    });
    fixture = TestBed.createComponent(ChatwithpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
