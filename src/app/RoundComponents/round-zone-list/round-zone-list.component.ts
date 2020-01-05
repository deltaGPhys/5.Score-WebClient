import { Component, OnInit } from '@angular/core';
import { CompetitionRound } from 'src/app/models/competition-round';
import { Zone } from 'src/app/models/zone';
import { RoundService } from 'src/app/services/round.service';
import { ZoneService } from 'src/app/services/zone.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-round-zone-list',
  templateUrl: './round-zone-list.component.html',
  styleUrls: ['./round-zone-list.component.css']
})
export class RoundZoneListComponent implements OnInit {

  private selectedRound: CompetitionRound;
  private zones: Zone[];

  constructor(private roundService: RoundService, private zoneService: ZoneService, private routeService: RouteService) { 
    this.roundService.selectedRound$.subscribe(data => this.selectedRound = data);
    this.zoneService.zones$.subscribe(data => this.zones = data);
    
  }

  ngOnInit() {
  }

  zoneChoice(zoneId: number) {
    this.routeService.updateRoutes(zoneId);
    this.roundService.changeZoneWindow("routeList");
  }
}
