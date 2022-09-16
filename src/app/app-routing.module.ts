import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ViewClientComponent } from './client/view-client/view-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent
  },
  {
    path: 'clients',
    component: ClientComponent
  },
  {
    path: 'clients/:id',
    component: ViewClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
