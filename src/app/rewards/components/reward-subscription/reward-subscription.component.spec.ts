import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardSubscriptionComponent } from './reward-subscription.component';

describe('RewardSubscriptionComponent', () => {
  let component: RewardSubscriptionComponent;
  let fixture: ComponentFixture<RewardSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
