import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Output() toggle = new EventEmitter<void>();

  onClick(){
    this.toggle.emit();
  }
}
