import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;

  @Output() selectedFeature = new EventEmitter<string>();

  onSelect(activeFeature: string): void {
    this.selectedFeature.emit(activeFeature);
  }
}
