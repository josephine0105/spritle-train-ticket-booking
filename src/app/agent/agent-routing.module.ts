import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'agent',
    component:CreateAgentComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
