import { Component } from '@angular/core';
import { SnapFormComponent } from '../snap-form/snap-form.component';
import { SnapOptionsComponent } from '../snap-options/snap-options.component';
import { SnapPreviewComponent } from '../snap-preview/snap-preview.component';

@Component({
  selector: 'app-snap-page',
  templateUrl: './snap-page.component.html',
  standalone: true,
  imports: [SnapFormComponent, SnapPreviewComponent, SnapOptionsComponent],
})
export class SnapPageComponent {}
