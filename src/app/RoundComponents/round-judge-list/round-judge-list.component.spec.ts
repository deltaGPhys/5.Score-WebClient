import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundJudgeListComponent } from './round-judge-list.component';

describe('RoundJudgeListComponent', () => {
  let component: RoundJudgeListComponent;
  let fixture: ComponentFixture<RoundJudgeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundJudgeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundJudgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
