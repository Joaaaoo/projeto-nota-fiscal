import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-componente-titulo-dinamico',
  imports: [],
  templateUrl: './componente-titulo-dinamico.component.html',
  styleUrl: './componente-titulo-dinamico.component.css',
})
export class ComponenteTituloDinamicoComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  constructor(private location: Location) {}

  voltar(): void {
    this.location.back();
  }
}
