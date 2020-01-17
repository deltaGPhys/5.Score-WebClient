import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { RoundService } from 'src/app/services/round.service';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-round-route-list',
  templateUrl: './round-route-list.component.html',
  styleUrls: ['./round-route-list.component.css']
})
export class RoundRouteListComponent implements OnInit {

  private selectedZone: Zone;
  private zones: Zone[];
  private routes: Route[];
  routeAddForm: FormGroup;

  constructor(private zoneService: ZoneService, private roundService: RoundService, private routeService: RouteService) { 
    this.zoneService.selectedZone$.subscribe(data => {this.selectedZone = data; this.routeService.updateRoutes(this.selectedZone.id)});
    this.zoneService.zones$.subscribe(data => {this.zones = data; this.routeAddForm = this.createFormGroup();});
    this.routeService.routes$.subscribe(data => this.routes = data);
  }

  ngOnInit() {
  }

  goBack() {
    this.roundService.changeZoneWindow("zoneList");
  }

  createFormGroup() {
    return new FormGroup({
      identifier: new FormControl(''),
      name: new FormControl(''),
      zone: new FormControl(this.selectedZone.id),
      value: new FormControl(''),
    });
  }

  routeChoice(routeId: number) {
    this.routeService.chooseRoute(routeId);
    this.roundService.changeZoneWindow("routeView");
  }

  onSubmit() {
    let newRoute = new Route(
      this.routeAddForm.controls['identifier'].value,
      this.routeAddForm.controls['name'].value,
      this.routeAddForm.controls['value'].value,
      this.selectedZone.id
    );
    this.routeAddForm.reset();
    this.routeService.createRoute(newRoute).subscribe(data => this.routeService.updateRoutes(this.selectedZone.id));
  }

}
