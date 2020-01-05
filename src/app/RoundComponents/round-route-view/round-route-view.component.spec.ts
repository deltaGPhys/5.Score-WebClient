import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRouteViewComponent } from './round-route-view.component';

describe('RoundRouteViewComponent', () => {
  let component: RoundRouteViewComponent;
  let fixture: ComponentFixture<RoundRouteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundRouteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRouteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
