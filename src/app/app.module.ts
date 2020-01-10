import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AppComponent } from './app.component';
import { GymListComponent } from './CompComponents/gym-list/gym-list.component';
import { LoginComponent } from './login/login.component';
import { GymService } from './services/gym.service';
import { CompListComponent } from './CompComponents/comp-list/comp-list.component';
import { RoundListComponent } from './CompComponents/round-list/round-list.component';
import { RoundViewComponent } from './RoundComponents/round-view/round-view.component';
import { RoundClimbersListComponent } from './RoundComponents/round-climbers-list/round-climbers-list.component';
import { RoundClimberViewComponent } from './RoundComponents/round-climber-view/round-climber-view.component';
import { RoundZoneListComponent } from './RoundComponents/round-zone-list/round-zone-list.component';
import { RoundRouteListComponent } from './RoundComponents/round-route-list/round-route-list.component';
import { RoundRouteViewComponent } from './RoundComponents/round-route-view/round-route-view.component';
import { RoundJudgeListComponent } from './RoundComponents/round-judge-list/round-judge-list.component';
import { RoundJudgeViewComponent } from './RoundComponents/round-judge-view/round-judge-view.component';
import { ScoreListComponent } from './ScoreComponents/score-list/score-list.component';
import { ClimberScoreViewComponent } from './ScoreComponents/climber-score-view/climber-score-view.component';
import { ScoreContainerComponent } from './ScoreComponents/score-container/score-container.component';
import { RoundContainerComponent } from './RoundComponents/round-container/round-container.component';
import { JudgeContainerComponent } from './JudgeComponents/judge-container/judge-container.component';
import { JudgeViewComponent } from './JudgeComponents/judge-view/judge-view.component';
import { QueueListComponent } from './JudgeComponents/queue-list/queue-list.component';
import { ScoringPaneComponent } from './JudgeComponents/scoring-pane/scoring-pane.component';

@NgModule({
  declarations: [
    AppComponent,
    GymListComponent,
    LoginComponent,
    CompListComponent,
    RoundListComponent,
    RoundViewComponent,
    RoundClimbersListComponent,
    RoundClimberViewComponent,
    RoundZoneListComponent,
    RoundRouteListComponent,
    RoundRouteViewComponent,
    RoundJudgeListComponent,
    RoundJudgeViewComponent,
    ScoreListComponent,
    ClimberScoreViewComponent,
    ScoreContainerComponent,
    RoundContainerComponent,
    JudgeContainerComponent,
    JudgeViewComponent,
    QueueListComponent,
    ScoringPaneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
  ],
  providers: [GymService],
  bootstrap: [AppComponent]
})
export class AppModule { }
