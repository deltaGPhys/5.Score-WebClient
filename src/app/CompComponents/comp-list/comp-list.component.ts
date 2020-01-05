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

@Component({
  selector: 'app-comp-list',
  templateUrl: './comp-list.component.html',
  styleUrls: ['./comp-list.component.css'],
  providers: [DecimalPipe]
})
export class CompListComponent implements OnInit {

  selectedGym: Gym;
  comps$: Observable<Competition[]>;
  compList: Competition[] = [];
  filter = new FormControl('Search');


  constructor(pipe: DecimalPipe, private gymService: GymService, private compService: CompService, private route: ActivatedRoute) {
    this.gymService
      .getGym(parseInt(this.route.snapshot.paramMap.get('gymId')))
      .subscribe(gym => {
        this.selectedGym = gym;
      });
    this.compService.getAllComps(parseInt(this.route.snapshot.paramMap.get('gymId')))
      .subscribe(data => {
        this.compList = data; 
        this.comps$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe))
        );
      });
  }

  ngOnInit() {
    
  }

  search(text: string, pipe: PipeTransform): Competition[] {
    return this.compList.filter(comp => {
      const term = text.toLowerCase();
      return comp.name.toLowerCase().includes(term);
    });
  }
}