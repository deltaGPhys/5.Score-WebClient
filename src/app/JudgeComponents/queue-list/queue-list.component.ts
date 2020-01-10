import { Component, OnInit } from '@angular/core';
import { JudgingService } from 'src/app/services/judging.service';
import { Climber } from 'src/app/models/climber';
import { ClimberService } from 'src/app/services/climber.service';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {

  queue: Climber[];
  currentClimber: Climber;
  qrResultString: string;
  climbers: Climber[];

  constructor(private judgingService: JudgingService, private climberService: ClimberService) {
    this.judgingService.queue$.subscribe(data => this.queue = data);
    this.judgingService.currentClimber$.subscribe(data => this.currentClimber = data);
    this.climberService.getAllClimbers(1).subscribe(data => this.climbers = data);
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

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    if (this.climbers) {
      this.climbers.forEach(climber => {if (climber.code == this.qrResultString) {this.addClimber(climber.id)}});
    } // Todo: restructure to allow break
  }

}
