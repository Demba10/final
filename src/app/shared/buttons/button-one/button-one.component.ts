import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-one',
  templateUrl: './button-one.component.html',
  styleUrls: ['./button-one.component.scss']
})
export class ButtonOneComponent {
  @Input() title: string = 'Button';
  @Input() color: string = '#4CAF50';
} 