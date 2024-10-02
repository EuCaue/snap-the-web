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

  async downloadImage() {
    this.loadingDownload = true;
    const imageUrl = this.snapData.snapUrl;
    const fileName = `snapped-image-${new Date().toLocaleTimeString()}.jpg`;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error', err);
    } finally {
      this.loadingDownload = false;
    }
  }
}
