import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaFiscal } from '../../models/nota-fiscal.model';
import { FaturamentoService } from '../../services/faturamento.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ComponenteTituloDinamicoComponent } from '../../../../shared/components/componente-titulo-dinamico/componente-titulo-dinamico.component';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { fadeInAnimation, fadeInOut } from '../../../../utils/animations';

@Component({
  selector: 'app-faturamento-page',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    RouterModule,
    ComponenteTituloDinamicoComponent,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    Toast,
  ],
  templateUrl: './faturamento-page.component.html',
  styleUrl: './faturamento-page.component.css',
  providers: [MessageService],
  animations: [fadeInAnimation, fadeInOut],
})
export class FaturamentoPageComponent implements OnInit {
  notasFiscais$ = new Observable<NotaFiscal[]>(); // Observable que armazena a lista de notas fiscais
  loading: boolean = true; // Variável que indica se a página está carregando

  constructor(
    private faturamentoService: FaturamentoService,
    private messageService: MessageService
  ) {}

  // Método chamado ao iniciar a página para obter a lista de notas fiscais
  ngOnInit() {
    this.scrollToTop();
    this.obterNotasFiscais();
  }

  // Método responsável por obter a lista de notas fiscais do serviço de faturamento
  obterNotasFiscais() {
    this.notasFiscais$ = this.faturamentoService.getNotasFiscais();
    this.notasFiscais$.subscribe({
      next: () => (this.loading = false), // Desativa spinner ao terminar de carregar notas fiscais
      error: (error) => {
        this.loading = false; // Desativa spinner em caso de erro
        this.messageService.add({
          // Exibe uma mensagem de erro ao usuário em caso de erro
          key: 'tr',
          severity: 'error',
          summary: 'Erro',
          detail: error.error.message || 'Erro ao carregar notas fiscais',
          sticky: true,
        });
      },
    });
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
