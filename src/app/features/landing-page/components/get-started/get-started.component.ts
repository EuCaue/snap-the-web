import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {

}
