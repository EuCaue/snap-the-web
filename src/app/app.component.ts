// TODO: remove unused components
//  TODO: separate in components
//  TODO: add image preview
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    InputTextModule,
    SplitButtonModule,
    CheckboxModule,
    DialogModule,
    InputSwitchModule,
    NgIf,
    ReactiveFormsModule,
    ImageModule,
    CardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  captureFullPage: boolean = false;
  title: string = 'Snap The Web';
  showResult: boolean = false;
  urlToSnap: string = '';
  isViewPortInvalid: boolean = false;
  viewport: string = '1920x1080';
  showOptionsPopup: boolean = false;
  form: FormGroup;
  items: Array<MenuItem> = [
    {
      label: 'Options',
      tooltip: 'Modify the behaviour of the request',
      styleClass: 'text-wrap',
      command: (_s) => {
        this.showOptionsPopup = !this.showOptionsPopup;
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
    private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    const pattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    this.form = this.fb.group({
      'url-input': ['', [Validators.required, Validators.pattern(pattern)]],
    });
  }
  callApi(): void {
    //  TODO: secure this later
    // environment.ts // with keys, added to gitignore
    // environment.prod.ts // with keys, added to gitignore
    // environment_example.ts // without keys and explaining how to set them up
    console.log(this.form.get('url-input')?.invalid);
    if (this.form.get('url-input')?.invalid) return;
    this.showSnapedImage = true;
    this.http
      .get('https://whatthecommit.com/index.txt', { responseType: 'text' })
      .subscribe((v) => {
        console.debug(v, this.urlToSnap, this.captureFullPage, this.viewport);
      });
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

  set showSnapedImage(value: boolean) {
    this.showResult = value;
  }
  get showSnapedImage() {
    return this.showResult;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
