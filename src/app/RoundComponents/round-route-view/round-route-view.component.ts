import { Component, OnInit } from '@angular/core';
import { RoundService } from 'src/app/services/round.service';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/route';

@Component({
  selector: 'app-round-route-view',
  templateUrl: './round-route-view.component.html',
  styleUrls: ['./round-route-view.component.css']
})
export class RoundRouteViewComponent implements OnInit {
  selectedRoute: Route;
  
  constructor(private roundService: RoundService, private routeService: RouteService) {
    this.routeService.selectedRoute$.subscribe(data => this.selectedRoute = data);
   }

  ngOnInit() {
  }

  goBack() {
    this.roundService.changeZoneWindow("routeList");
  }
}
