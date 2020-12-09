import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {
    // path: 'not-found',  --- change to empty for lazy loading
    path: '',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundModule {}
