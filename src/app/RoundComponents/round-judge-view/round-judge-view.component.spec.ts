import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundJudgeViewComponent } from './round-judge-view.component';

describe('RoundJudgeViewComponent', () => {
  let component: RoundJudgeViewComponent;
  let fixture: ComponentFixture<RoundJudgeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundJudgeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundJudgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
