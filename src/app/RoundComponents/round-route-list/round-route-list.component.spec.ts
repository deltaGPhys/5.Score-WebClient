import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRouteListComponent } from './round-route-list.component';

describe('RoundRouteListComponent', () => {
  let component: RoundRouteListComponent;
  let fixture: ComponentFixture<RoundRouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundRouteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
