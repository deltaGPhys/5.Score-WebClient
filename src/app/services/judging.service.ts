import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Climber } from '../models/climber';
import { ClimberService } from './climber.service';
import { RoundService } from './round.service';
import { GymService } from './gym.service';
import { CompService } from './comp.service';
import { ZoneService } from './zone.service';

@Injectable({
  providedIn: 'root'
})
export class JudgingService {

  currentJudge$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentRound$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentClimber$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentZone$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  queue$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  queue: Climber[];
  
  constructor(private climberService: ClimberService, private roundService: RoundService, private gymService: GymService, private compService: CompService, private zoneService: ZoneService) { 
    this.queue$.next([]);
    this.queue$.subscribe(data => this.queue = data);
  }

  addToQueue(climberId: number) {
    //Todo: take this out
    //climberId = Math.floor(Math.random() * 19) + 1;
    this.climberService.getClimber(climberId)
      .subscribe(climber => {
        if (this.queue.length == 0 || this.queue[this.queue.length-1].id != climber.id) {
          this.queue.push(climber);
          this.queue$.next(this.queue);
        }
      });
  }

  popFromQueue(): Climber {
    let climber: Climber = null;
    if (this.queue.length) {
       climber = this.queue.shift();
    }
    this.queue$.next(this.queue);
    this.currentClimber$.next(climber);
    return climber;
  }

}
