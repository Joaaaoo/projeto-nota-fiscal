import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ComponenteTituloDinamicoComponent } from '../../../shared/components/componente-titulo-dinamico/componente-titulo-dinamico.component';

@Component({
  selector: 'app-page-error-not-found',
  imports: [
    CommonModule,
    ComponenteTituloDinamicoComponent,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './page-error-not-found.component.html',
  styleUrls: ['./page-error-not-found.component.css'],
})
export class PageErrorNotFoundComponent {}
