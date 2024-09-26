import { Component } from '@angular/core';
import { SnapService } from '../../../core/services/snap.service';
import { SnapFormComponent } from '../snap-form/snap-form.component';
import { SnapOptionsComponent } from '../snap-options/snap-options.component';
import { SnapPreviewComponent } from '../snap-preview/snap-preview.component';

@Component({
  selector: 'app-snap-page',
  templateUrl: './snap-page.component.html',
  standalone: true,
  imports: [SnapFormComponent, SnapPreviewComponent, SnapOptionsComponent] // Importar os componentes aqui
})
export class SnapPageComponent {
  showSnapedImage: boolean = false;
  imageUrl: string = '';
  captureFullPage: boolean = false;
  viewport: string = '1920x1080';

  constructor(private snapService: SnapService) {}

  handleSnapWebsite(url: string): void {
    this.snapService.getSnap(url).subscribe(response => {
      this.showSnapedImage = true;
      console.log(response)
      this.imageUrl = 'https://some-image-url.com';
    });
  }
}
