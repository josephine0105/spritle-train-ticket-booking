import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatConfigComponent } from './seat-config.component';

describe('SeatConfigComponent', () => {
  let component: SeatConfigComponent;
  let fixture: ComponentFixture<SeatConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
