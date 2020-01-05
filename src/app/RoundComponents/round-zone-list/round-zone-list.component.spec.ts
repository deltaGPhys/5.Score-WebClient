import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundZoneListComponent } from './round-zone-list.component';

describe('RoundZoneListComponent', () => {
  let component: RoundZoneListComponent;
  let fixture: ComponentFixture<RoundZoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundZoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundZoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
