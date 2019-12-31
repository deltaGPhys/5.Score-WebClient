import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { Gym } from '../models/gym';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-gym-list',
  templateUrl: './gym-list.component.html',
  styleUrls: ['./gym-list.component.css'],
  providers: [DecimalPipe]
})
export class GymListComponent implements OnInit {

  gyms$: Observable<Gym[]>;
  gymList: Gym[] = [new Gym(1,"Delaware Rock Gym"), new Gym(2,"Earth Treks"), new Gym(3,"Philadelphia Rock Gym Wyncote"), new Gym(4,"Philadelphia Rock Gym Oaks")];
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.gyms$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
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


