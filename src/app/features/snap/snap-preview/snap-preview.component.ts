import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Observable, Subscription } from 'rxjs';
import { SnapService } from '../services/snap.service';
import { SnapData } from '../types/types';

@Component({
  selector: 'app-snap-preview',
  standalone: true,
  imports: [
    CommonModule,
    ImageModule,
    CardModule,
    SplitButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './snap-preview.component.html',
  styleUrl: './snap-preview.component.css',
})
export class SnapPreviewComponent {
  snapData: SnapData = { snapUrl: '', showSnappedImage: false };
  subscription: Subscription;
  loadingPreview$: Observable<boolean>;
  loadingDownload: boolean = false;
  showSnappedImage: boolean = false;
  constructor(private snapService: SnapService) {
    this.loadingPreview$ = this.snapService.isLoading$;
    this.subscription = this.snapService.snapUrlPreview$.subscribe((data) => {
      this.snapData = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  downloadImage() {
    this.loadingDownload = true;
    const imageUrl = this.snapData.snapUrl;
    if (imageUrl) {
      this.snapService.downloadImage(imageUrl).subscribe({
        //  TODO: send a feedback to user
        next: () => console.log('Download completed'),
        error: (err) => console.error('Error while downloading image:', err),
        complete: () => (this.loadingDownload = false),
      });
    } else {
      console.warn('No image URL available');
      this.loadingDownload = false;
    }
  }
}
