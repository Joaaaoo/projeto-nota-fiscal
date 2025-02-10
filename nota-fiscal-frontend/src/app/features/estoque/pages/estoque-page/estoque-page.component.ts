import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, map, Observable, startWith } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { EstoqueService } from '../../services/estoque.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ComponenteTituloDinamicoComponent } from '../../../../shared/components/componente-titulo-dinamico/componente-titulo-dinamico.component';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { fadeInAnimation, fadeInOut } from '../../../../utils/animations';

@Component({
  selector: 'app-estoque-page',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    InputIconModule,
    IconFieldModule,
    RouterModule,
    ComponenteTituloDinamicoComponent,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    Toast,
  ],
  templateUrl: './estoque-page.component.html',
  styleUrl: './estoque-page.component.css',
  providers: [MessageService],
  animations: [fadeInAnimation, fadeInOut],
})
/*
  Página de estoque, responsável por exibir a lista de produtos cadastrados no sistema.
  A página é composta por uma tabela com os produtos e um botão para adicionar um novo produto e um botão para editar produto.
  A tabela exibe as informações de cada produto, como nome, descrição, quantidade e valor.
  A página também exibe um spinner de carregamento enquanto os produtos são carregados.
*/
export class EstoquePageComponent implements OnInit {
  produtos$ = new Observable<Produto[]>(); // Observable que armazena a lista de produtos
  loading: boolean = true; // Variável que indica se a página está carregando

  constructor(
    private estoqueService: EstoqueService,
    private messageService: MessageService
  ) {}

  // Método chamado ao iniciar a página para obter a lista de produtos
  ngOnInit() {
    this.scrollToTop();
    this.obterProdutos();
  }

  // Método responsável por obter a lista de produtos do serviço de estoque
  obterProdutos() {
    this.produtos$ = this.estoqueService.getProdutos();
    this.produtos$.subscribe({
      next: () => (this.loading = false), // Desativa spinner ao terminar de carregar produtos
      error: (error) => {
        this.loading = false; // Desativa spinner em caso de erro
        this.messageService.add({
          // Exibe uma mensagem de erro ao usuário em caso de erro
          key: 'tr',
          severity: 'error',
          summary: 'Erro',
          detail: error.error.message || 'Erro ao carregar estoque',
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
