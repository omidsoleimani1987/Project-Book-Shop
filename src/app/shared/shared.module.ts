import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './directives/dropdown.directive';
import { AlertComponent } from './styles/alert/alert.component';
import { LoadingSpinnerComponent } from './styles/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent, AlertComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule {}
