import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { SnapService } from '../services/snap.service';
import { ImageFormat, SnapOptions } from '../types/types';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-snap-options',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    CommonModule,
    InputSwitchModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './snap-options.component.html',
  styleUrl: './snap-options.component.css',
})
export class SnapOptionsComponent implements OnInit {
  @Input() showPopup: boolean = Boolean();
  @Output() showPopupChange = new EventEmitter<boolean>();
  isViewPortInvalid: boolean = false;
  snapOptions: SnapOptions;
  imageFormats: ImageFormat[] | undefined;

  constructor(private snapService: SnapService) {
    this.snapOptions = this.snapService.getSnapOptions();
  }

  updateShowPopup(state: boolean) {
    this.showPopup = state;
    this.showPopupChange.emit(this.showPopup);
    console.log(this.imageFormats);
  }

  updateCaptureFullPage(captureFullPage: boolean) {
    this.snapService.setSnapOptions({ captureFullPage });
  }

  updateViewport(viewport: string) {
    this.snapService.setSnapOptions({ viewport });
  }

  updateImageFormat(selectedFormat: ImageFormat) {
    console.log(selectedFormat);
    this.snapService.setSnapOptions({ imageFormat: selectedFormat });
    console.log(this.snapService.getSnapOptions());
  }

  checkViewPort(viewport: string) {
    const [width, height] = viewport.split('x').map(Number);
    const regex = /^\d+x\d+$/;

    if (!regex.test(viewport) || width <= 0 || height <= 0) {
      this.isViewPortInvalid = true;
      return true;
    }

    this.isViewPortInvalid = false;
    this.updateViewport(viewport);
    return false;
  }
  ngOnInit(): void {
    this.imageFormats = [
      { format: 'png' },
      { format: 'jpg' },
      { format: 'webp' },
    ];
  }
}
