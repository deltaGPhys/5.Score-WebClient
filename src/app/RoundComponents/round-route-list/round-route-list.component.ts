import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { RoundService } from 'src/app/services/round.service';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-round-route-list',
  templateUrl: './round-route-list.component.html',
  styleUrls: ['./round-route-list.component.css']
})
export class RoundRouteListComponent implements OnInit {

  private selectedZone: Zone;
  private routes: Route[];

  constructor(private zoneService: ZoneService, private roundService: RoundService, private routeService: RouteService) { 
    this.zoneService.selectedZone$.subscribe(data => {this.selectedZone = data; this.routeService.updateRoutes(this.selectedZone.id)});
    this.routeService.routes$.subscribe(data => this.routes = data);
  }

  ngOnInit() {
  }

  goBack() {
    this.roundService.changeZoneWindow("zoneList");
  }

}
