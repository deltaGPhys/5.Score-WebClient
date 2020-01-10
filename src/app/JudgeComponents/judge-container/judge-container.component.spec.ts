import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeContainerComponent } from './judge-container.component';

describe('JudgeContainerComponent', () => {
  let component: JudgeContainerComponent;
  let fixture: ComponentFixture<JudgeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
