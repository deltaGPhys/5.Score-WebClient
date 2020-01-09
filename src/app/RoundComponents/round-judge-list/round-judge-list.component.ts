import { Component, OnInit, PipeTransform } from '@angular/core';
import { CompetitionRound } from 'src/app/models/competition-round';
import { RoundService } from 'src/app/services/round.service';
import { ClimberService } from 'src/app/services/climber.service';
import { RouteService } from 'src/app/services/route.service';
import { Climber } from 'src/app/models/climber';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Judge } from 'src/app/models/judge';
import { JudgeService } from 'src/app/services/judge.service';

@Component({
  selector: 'app-round-judge-list',
  templateUrl: './round-judge-list.component.html',
  styleUrls: ['./round-judge-list.component.css'],
  providers: [DecimalPipe]
})
export class RoundJudgeListComponent implements OnInit {

  private selectedRound: CompetitionRound;
  private judges: Judge[];
  private judges$: Observable<Judge[]>;
  filter = new FormControl('Search');
  
  constructor(pipe: DecimalPipe, private roundService: RoundService, private judgeService: JudgeService, private routeService: RouteService) { 
    this.roundService.selectedRound$.subscribe(data => this.selectedRound = data);
    this.judgeService.judges$
      .subscribe(data => {
        this.judges = data;
        this.judges$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe))
        );
      });
  }

  ngOnInit() {
  }

  toClimbers() {
    this.roundService.changePeopleWindow("climberList");
  }

  judgeChoice(judgeId: number) {
    this.judgeService.chooseJudge(judgeId);
    this.roundService.changePeopleWindow("judgeView");
  }

  search(text: string, pipeT: PipeTransform): Judge[] {
    return this.judges.filter(judge => {
      const term = text.toLowerCase();
      return judge.name.toLowerCase().includes(term)
          || pipeT.transform(judge.zones).includes(term);
    });
  }

}
