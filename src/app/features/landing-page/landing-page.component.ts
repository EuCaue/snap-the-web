import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { GetStartedComponent } from './components/get-started/get-started.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    GetStartedComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
