import { Component, OnInit } from '@angular/core';
import { JudgingService } from 'src/app/services/judging.service';
import { Climber } from 'src/app/models/climber';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {

  queue: Climber[];
  currentClimber: Climber;

  constructor(private judgingService: JudgingService) {
    this.judgingService.queue$.subscribe(data => this.queue = data);
    this.judgingService.currentClimber$.subscribe(data => this.currentClimber = data);  
  }

  ngOnInit() {
  }

  nextClimber() {
    this.judgingService.popFromQueue();
  }

  addClimber(climberId: number) {
    console.log(climberId);
    this.judgingService.addToQueue(climberId);
  }

}
