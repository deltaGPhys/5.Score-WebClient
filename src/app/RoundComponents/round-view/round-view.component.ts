import { Component, OnInit } from '@angular/core';
import { Gym } from 'src/app/models/gym';
import { GymService } from 'src/app/services/gym.service';
import { CompetitionRound } from 'src/app/models/competition-round';
import { Competition } from 'src/app/models/competition';
import { CompService } from 'src/app/services/comp.service';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-round-view',
  templateUrl: './round-view.component.html',
  styleUrls: ['./round-view.component.css']
})
export class RoundViewComponent implements OnInit {

  private selectedGym: Gym;
  private selectedComp: Competition;
  private selectedRound: CompetitionRound;

  constructor(private gymService: GymService, private compService: CompService, private roundService: RoundService) { 
    this.gymService.selectedGym$.subscribe(data => this.selectedGym = data);
    this.compService.selectedComp$.subscribe(data => this.selectedComp = data);
    this.roundService.selectedRound$.subscribe(data => this.selectedRound = data);
  }

  ngOnInit() {
  }

}
