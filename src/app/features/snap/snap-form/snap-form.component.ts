import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SnapService } from '../services/snap.service';
import { SnapOptionsComponent } from '../snap-options/snap-options.component';

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
  ],
  templateUrl: './snap-form.component.html',
  styleUrl: './snap-form.component.css',
})
export class SnapFormComponent {
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
        //  TODO: implemenet logic to download
      },
    },
  ];
  constructor(
    private fb: FormBuilder,
    private snapService: SnapService,
  ) {
    const pattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})/

    this.form = this.fb.group({
      'url-input': ['', [Validators.required, Validators.pattern(pattern)]],
    });
  }

  callApi() {
    const urlSnapControl = this.form.get('url-input');
    if (urlSnapControl?.invalid) {
      urlSnapControl.markAsDirty();
      urlSnapControl.markAsTouched();
      return;
    }
    const snapOptions = this.snapService.getSnapOptions();
    const snapObservable = this.snapService.getSnap(snapOptions);
    snapObservable.subscribe(() => {
      this.snapService.setData({
        snapUrl:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
        showSnappedImage: true,
      });
      this.form.get('url-input')?.reset();
    });
  }
}
