import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SnapService } from '../services/snap.service';
import { SnapOptionsComponent } from '../snap-options/snap-options.component';
import { SnapData } from '../types/types';
import { Subscription, take } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-snap-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SnapOptionsComponent,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  templateUrl: './snap-form.component.html',
  styleUrl: './snap-form.component.css',
})
export class SnapFormComponent {
  snapData: SnapData = { snapUrl: '', showSnappedImage: false };
  subscription: Subscription;
  form: FormGroup;
  showOptionsPopup: boolean = false;

  items: Array<MenuItem> = [
    {
      label: 'Options',
      tooltip: 'Modify the behaviour of the request',
      styleClass: 'text-wrap',
      command: (_s) => {
        this.showOptionsPopup = true;
      },
    },
    {
      label: 'Download',
      tooltip: 'Download without showing the screenshot',
      command: (_s) => {
        console.log('cliecked in downoad direct');
        this.showToast();
        this.callApi(false);
        this.snapService.snapUrlPreview$.pipe(take(1)).subscribe(() => {
          this.downloadSnapImage();
        });
      },
    },
  ];

  constructor(
    private fb: FormBuilder,
    private snapService: SnapService,
    private messageService: MessageService,
  ) {
    const pattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})/;

    this.form = this.fb.group({
      'url-input': ['', [Validators.required, Validators.pattern(pattern)]],
    });

    this.subscription = this.snapService.snapUrlPreview$.subscribe((data) => {
      this.snapData = data;
    });
  }

  showToast(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Image started to download',
    });
  }

  callApi(showSnappedImage: boolean = true) {
    console.log('called api');
    const urlSnapControl = this.form.get('url-input');
    if (urlSnapControl?.invalid) {
      urlSnapControl.markAsDirty();
      urlSnapControl.markAsTouched();
      return;
    }
    const snapOptions = this.snapService.getSnapOptions();
    const snapObservable = this.snapService.getSnap(
      urlSnapControl?.value,
      snapOptions,
    );
    snapObservable.subscribe((snapUrl: string) => {
      this.snapService.setData({
        snapUrl,
        showSnappedImage,
      });
      this.form.get('url-input')?.reset();
    });
  }

  downloadSnapImage() {
    const imageUrl = this.snapData.snapUrl;
    if (imageUrl) {
      this.snapService.downloadImage(imageUrl).subscribe({
        next: () => console.log('Image download started'),
        error: (err) => console.error('Error downloading image:', err),
      });
    } else {
      console.warn('No image URL to download');
    }
  }
}
