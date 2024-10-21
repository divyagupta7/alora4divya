import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientprofileComponent } from './clientprofile.component';

describe('ClientprofileComponent', () => {
  let component: ClientprofileComponent;
  let fixture: ComponentFixture<ClientprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientprofileComponent]
    });
    fixture = TestBed.createComponent(ClientprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
