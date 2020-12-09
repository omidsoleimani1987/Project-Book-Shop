import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full' // better to add this
  }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundModule {}
