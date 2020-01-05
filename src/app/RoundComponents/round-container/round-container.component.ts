import { Component, OnInit } from '@angular/core';
import { Gym } from 'src/app/models/gym';

import { GymService } from '../../services/gym.service';
import { CompService } from '../../services/comp.service';
import { Competition } from 'src/app/models/competition';
import { RoundService } from 'src/app/services/round.service';
import { CompetitionRound } from 'src/app/models/competition-round';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-round-container',
  templateUrl: './round-container.component.html',
  styleUrls: ['./round-container.component.css']
})
export class RoundContainerComponent implements OnInit {

  private selectedGym: Gym;
  private selectedComp: Competition;
  private selectedRound: CompetitionRound;
  private peopleWindow: string;
  private zoneWindow: string;

  constructor(private gymService: GymService, private compService: CompService, private roundService: RoundService, private route: ActivatedRoute) { 
    this.gymService.selectedGym$.subscribe(data => this.selectedGym = data);
    this.compService.selectedComp$.subscribe(data => this.selectedComp = data);
    this.roundService.selectedRound$.subscribe(data => this.selectedRound = data);
    this.roundService.chooseRound(parseInt(this.route.snapshot.paramMap.get('roundId')));
    this.roundService.zoneWindow$.subscribe(data => this.zoneWindow = data);
    this.roundService.peopleWindow$.subscribe(data => this.peopleWindow = data);
  }

  ngOnInit() {
    this.roundService.changeZoneWindow("zoneList");
    this.roundService.changePeopleWindow("climberList");
  }

}
