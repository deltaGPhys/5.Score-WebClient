import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeViewComponent } from './judge-view.component';

describe('JudgeViewComponent', () => {
  let component: JudgeViewComponent;
  let fixture: ComponentFixture<JudgeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
