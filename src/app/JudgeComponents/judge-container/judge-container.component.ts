import { Component, OnInit } from '@angular/core';
import { JudgeService } from 'src/app/services/judge.service';
import { GymService } from 'src/app/services/gym.service';
import { Judge } from 'src/app/models/judge';
import { CompService } from 'src/app/services/comp.service';
import { RoundService } from 'src/app/services/round.service';
import { CompetitionRound } from 'src/app/models/competition-round';
import { Competition } from 'src/app/models/competition';
import { Gym } from 'src/app/models/gym';
import { Route } from 'src/app/models/route';
import { Climber } from 'src/app/models/climber';
import { JudgingService } from 'src/app/services/judging.service';

@Component({
  selector: 'app-judge-container',
  templateUrl: './judge-container.component.html',
  styleUrls: ['./judge-container.component.css']
})
export class JudgeContainerComponent implements OnInit {

  selectedGym: Gym; //Todo
  selectedComp: Competition; //Todo
  selectedRound: CompetitionRound;
  currentJudge: Judge;
  currentClimber: Climber;
  routes: Route[];

  constructor(private judgeService: JudgeService, private gymService: GymService, private compService: CompService, private roundService: RoundService, private judgingService: JudgingService) { 
    this.judgeService.selectedJudge$.subscribe(data => {this.currentJudge = data; console.log(data);});
    // this.judgeService.getRoundForJudge(this.selectedJudge.id).subscribe(data => this.selectedRound = data);
    this.judgingService.currentClimber$.subscribe(data => this.currentClimber = data);
  }

  ngOnInit() {
  }
  
  judgeData() {
    console.log("judgedata",this.currentJudge, typeof this.currentJudge);
    if (this.currentJudge) {
      
    }
  }
}
