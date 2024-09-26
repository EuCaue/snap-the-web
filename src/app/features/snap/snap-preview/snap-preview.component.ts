import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Observable, Subscription } from 'rxjs';
import { SnapService } from '../../../core/services/snap.service';

type Data = {
  snapUrl: string;
  showSnappedImage: boolean;
};
@Component({
  selector: 'app-snap-preview',
  standalone: true,
  imports: [CommonModule, ImageModule, CardModule, SplitButtonModule, ProgressSpinnerModule],
  templateUrl: './snap-preview.component.html',
  styleUrl: './snap-preview.component.css',
})
export class SnapPreviewComponent {
  data: Data = { snapUrl: '', showSnappedImage: false };
  subscription: Subscription;
  loading$: Observable<boolean>;
  showSnappedImage: boolean = false;
  constructor(private snapService: SnapService) {
    this.loading$ = this.snapService.isLoading$;
    this.subscription = this.snapService.snapUrlPreview$.subscribe((data) => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
