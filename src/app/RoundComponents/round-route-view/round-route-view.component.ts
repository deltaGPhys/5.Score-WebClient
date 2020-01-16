import { Component, OnInit } from '@angular/core';
import { RoundService } from 'src/app/services/round.service';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/route';
import { Zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-round-route-view',
  templateUrl: './round-route-view.component.html',
  styleUrls: ['./round-route-view.component.css']
})
export class RoundRouteViewComponent implements OnInit {
  selectedRoute: Route;
  selectedZone: Zone;
  editRouteForm: FormGroup;
  zones: Zone[];

  constructor(private roundService: RoundService, private routeService: RouteService, private zoneService: ZoneService) {
    this.zoneService.zones$.subscribe(data => this.zones = data);
    this.zoneService.selectedZone$.subscribe(data => this.selectedZone = data);
    this.routeService.selectedRoute$.subscribe(data => {this.selectedRoute = data;console.log(this.zones);this.editRouteForm = this.createFormGroup();});
    
   }

  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({
      identifier: new FormControl(this.selectedRoute.identifier),
      name: new FormControl(this.selectedRoute.name),
      zone: new FormControl(this.selectedZone.id),
      value: new FormControl(this.selectedRoute.value),
    });
  }

  revert() {
    this.editRouteForm.reset();
  }

  goBack() {
    this.roundService.changeZoneWindow("routeList");
  }

  onSubmit() {
    let newIdentifier: string = this.editRouteForm.controls['identifier'].value;
    let newName: string = this.editRouteForm.controls['name'].value;
    let newValue: number = this.editRouteForm.controls['value'].value;
    this.selectedRoute.zone = this.editRouteForm.controls['zone'].value;
    if (newName != this.selectedRoute.name 
      || newValue != this.selectedRoute.value 
      || this.selectedRoute.zone != this.selectedZone.id
      || newIdentifier != this.selectedRoute.identifier) {
       
        this.selectedRoute.identifier = newIdentifier;
        this.selectedRoute.name = newName;
        this.selectedRoute.value = newValue;
        this.routeService.editRoute(this.selectedRoute).subscribe(data => data); 
    }
    this.revert();
    this.roundService.changeZoneWindow("routeList");
    
  }
}
