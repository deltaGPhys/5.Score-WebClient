import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { Gym } from '../../models/gym';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GymService } from '../../services/gym.service';
import { CompService } from '../../services/comp.service';
import { Competition } from '../../models/competition';
import { ActivatedRoute } from '@angular/router';
import { CompetitionRound } from 'src/app/models/competition-round';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-round-list',
  templateUrl: './round-list.component.html',
  styleUrls: ['./round-list.component.css'],
  providers: [DecimalPipe]
})
export class RoundListComponent implements OnInit {

  selectedGym: Gym;
  selectedComp: Competition;
  rounds$: Observable<CompetitionRound[]>;
  roundList: CompetitionRound[] = [];
  filter = new FormControl('Search');

  constructor(pipe: DecimalPipe, private gymService: GymService, private compService: CompService, private roundService: RoundService, private route: ActivatedRoute) {
    
    this.gymService
      .getGym(parseInt(this.route.snapshot.paramMap.get('gymId')))
      .subscribe(gym => {
        this.selectedGym = gym;
        this.gymService.chooseGym(this.selectedGym.id);
        console.log(this.selectedGym);
      });
    this.compService
      .getComp(parseInt(this.route.snapshot.paramMap.get('compId')))
      .subscribe(comp => {
        this.selectedComp = comp;
        this.compService.chooseComp(this.selectedComp.id);
        console.log(this.selectedComp);
      });
    this.roundService.getAllRounds(parseInt(this.route.snapshot.paramMap.get('compId')))
      .subscribe(data => {
        this.roundList = data; 
        this.rounds$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe))
        );
      });
  }

  ngOnInit() {
  }

  search(text: string, pipe: PipeTransform): CompetitionRound[] {
    return this.roundList.filter(round => {
      const term = text.toLowerCase();
      return round.name.toLowerCase().includes(term);
    });
  }
}