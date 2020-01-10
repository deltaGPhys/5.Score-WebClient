import { Component, OnInit } from '@angular/core';
import { Climber } from 'src/app/models/climber';
import { ClimberService } from 'src/app/services/climber.service';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-round-climber-view',
  templateUrl: './round-climber-view.component.html',
  styleUrls: ['./round-climber-view.component.css']
})
export class RoundClimberViewComponent implements OnInit {

  selectedClimber: Climber = null;
  
  constructor(private climberService: ClimberService, private roundService: RoundService) {
    this.climberService.selectedClimber$
      .subscribe(data => {
        this.selectedClimber = data; 
      });
  }

  ngOnInit() {
    
    this.roundService.changePeopleWindow("climberView");
  }

  goBack() {
    this.roundService.changePeopleWindow("climberList");
  }

}
