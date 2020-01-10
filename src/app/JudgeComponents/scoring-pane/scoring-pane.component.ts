import { Component, OnInit, Input } from '@angular/core';
import { Route } from 'src/app/models/route';
import { Judge } from 'src/app/models/judge';
import { Climber } from 'src/app/models/climber';
import { JudgingService } from 'src/app/services/judging.service';

@Component({
  selector: 'app-scoring-pane',
  templateUrl: './scoring-pane.component.html',
  styleUrls: ['./scoring-pane.component.css']
})
export class ScoringPaneComponent implements OnInit {

  @Input() routes: Route[];
  @Input() currentJudge: Judge;
  @Input() currentClimber: Climber;

  constructor(private judgingService: JudgingService) { 

    
  }

  ngOnInit() {
  }

}
