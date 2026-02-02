import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExperience } from './card-experience';

describe('CardExperience', () => {
  let component: CardExperience;
  let fixture: ComponentFixture<CardExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardExperience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
