import { Component, OnInit, Input } from '@angular/core';
import { JudgeService } from 'src/app/services/judge.service';
import { Judge } from 'src/app/models/judge';

@Component({
  selector: 'app-judge-view',
  templateUrl: './judge-view.component.html',
  styleUrls: ['./judge-view.component.css']
})
export class JudgeViewComponent implements OnInit {

  @Input() currentJudge: Judge;

  constructor() {
    
  }

  ngOnInit() {
  }

}
