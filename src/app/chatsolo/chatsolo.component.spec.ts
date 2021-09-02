import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsoloComponent } from './chatsolo.component';

describe('ChatsoloComponent', () => {
  let component: ChatsoloComponent;
  let fixture: ComponentFixture<ChatsoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
