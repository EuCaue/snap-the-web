import { SnapPageComponent } from './features/snap/snap-page/snap-page.component';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'snap', component: SnapPageComponent },
  { path: '', component: LandingPageComponent },
];
