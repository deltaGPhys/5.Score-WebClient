import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { Gym } from '../../models/gym';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GymService } from '../../services/gym.service';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.css'],
  providers: [DecimalPipe]
})
export class GymListComponent implements OnInit {

  gyms$: Observable<Gym[]>;
  gymList: Gym[] = [];
  filter = new FormControl('Search');

  constructor(pipe: DecimalPipe, private gymService: GymService) {
    this.gymService.getAllGyms()
      .subscribe(data => {
        this.gymList = data;
        this.gyms$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe))
        );
      });
    
  }

  ngOnInit() {
    
  }
  
  search(text: string, pipe: PipeTransform): Gym[] {
    return this.gymList.filter(gym => {
      const term = text.toLowerCase();
      return gym.name.toLowerCase().includes(term);
    });
  }

}


