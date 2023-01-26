import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./shared/shared.module').then((m) => m.SharedModule)
    
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () =>
    import('./auth/auth.module').then((m) => m.AuthModule)
    
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () =>
    import('./agent/agent.module').then((m) => m.AgentModule)
    
  },
   {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
