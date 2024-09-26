import { SnapPageComponent } from './features/snap/snap-page/snap-page.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'snap', component: SnapPageComponent },
  { path: '', component: AppComponent },
];
