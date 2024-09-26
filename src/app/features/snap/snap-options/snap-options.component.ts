import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-snap-options',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    CommonModule,
    InputSwitchModule,
    InputTextModule,
  ],
  templateUrl: './snap-options.component.html',
  styleUrl: './snap-options.component.css',
})
export class SnapOptionsComponent {
  @Input() showPopup: boolean = false;
  @Output() showPopupChange = new EventEmitter<boolean>();
  viewport: string = '1920x1080';
  captureFullPage: boolean = false;
  isViewPortInvalid: boolean = false;

  updateShowPopup(state: boolean){
    this.showPopup = state;
    this.showPopupChange.emit(this.showPopup)
  }


  checkViewPort(viewport: string) {
    // @ts-ignore
    const [width, height] = viewport.split('x').map(Number);
    const regex = /^\d+x\d+$/;

    if (!regex.test(viewport) || width <= 0 || height <= 0) {
      this.isViewPortInvalid = true;
      return false;
    }

    this.isViewPortInvalid = false;
    return true;
  }
}
