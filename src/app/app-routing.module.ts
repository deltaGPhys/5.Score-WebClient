import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GymListComponent } from './CompComponents/gym-list/gym-list.component'
import { LoginComponent } from './login/login.component'
import { CompListComponent } from './CompComponents/comp-list/comp-list.component';
import { RoundListComponent } from './CompComponents/round-list/round-list.component';
import { RoundContainerComponent } from './RoundComponents/round-container/round-container.component';
import { ScoreContainerComponent } from './ScoreComponents/score-container/score-container.component';

const routes: Routes = [
    //{ path: '', component: LoginComponent },
    { path: '', component: GymListComponent },
    { path: 'gyms', component: GymListComponent },
    { path: 'complist/:gymId', component: CompListComponent },
    { path: 'roundlist/:compId/:gymId', component: RoundListComponent },
    { path: 'round/:roundId', component: RoundContainerComponent },
    { path: 'scoring/:roundId', component: ScoreContainerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
