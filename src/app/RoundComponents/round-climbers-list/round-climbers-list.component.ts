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

@Component({
  selector: 'app-round-climbers-list',
  templateUrl: './round-climbers-list.component.html',
  styleUrls: ['./round-climbers-list.component.css'],
  providers: [DecimalPipe]
})
export class RoundClimbersListComponent implements OnInit {

  private selectedRound: CompetitionRound;
  private climbers: Climber[];
  private climbers$: Observable<Climber[]>;
  filter = new FormControl('Search');
  
  constructor(pipe: DecimalPipe, private roundService: RoundService, private climberService: ClimberService, private routeService: RouteService) { 
    this.roundService.selectedRound$.subscribe(data => this.selectedRound = data);
    this.climberService.climbers$
      .subscribe(data => {
        this.climbers = data;
        this.climbers$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe))
        );
      });
  }

  ngOnInit() {
  }

  search(text: string, pipeT: PipeTransform): Climber[] {
    return this.climbers.filter(climber => {
      const term = text.toLowerCase();
      return climber.firstName.toLowerCase().includes(term)
          || climber.lastName.toLowerCase().includes(term)
          || climber.email.toLowerCase().includes(term)
          || pipeT.transform(climber.id).includes(term);
    });
  }

}
