import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EstoqueService } from '../../services/estoque.service';
import { MessageService } from 'primeng/api';
import { ComponenteTituloDinamicoComponent } from '../../../../shared/components/componente-titulo-dinamico/componente-titulo-dinamico.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { fadeInAnimation, fadeInOut } from '../../../../utils/animations';

@Component({
  selector: 'app-adicionar-produto-estoque',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponenteTituloDinamicoComponent,
    PanelModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    Toast,
  ],
  templateUrl: './adicionar-produto-estoque.component.html',
  styleUrl: './adicionar-produto-estoque.component.css',
  providers: [MessageService],
  animations: [fadeInAnimation, fadeInOut],
})
/*
  Página de adicionar produto ao estoque, responsável por exibir um formulário para adicionar um novo produto ao estoque.
  O formulário é composto por campos para inserir o nome, preço e quantidade do produto.
  A página também exibe um botão para adicionar o produto e um botão para voltar para a página de estoque.


*/
export class AdicionarProdutoEstoqueComponent implements OnInit {
  produtoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.scrollToTop();
    this.criarFormulario();
  }

  criarFormulario() {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      quantidadeEstoque: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      this.estoqueService.adicionarProduto(this.produtoForm.value).subscribe({
        next: () => {
          this.messageService.add({
            key: 'tr',
            severity: 'success',
            summary: 'Sucesso',
            detail:
              'Produto adicionado com sucesso, redirecionando para página de estoque...',
          });
          setTimeout(() => {
            this.router.navigate(['/estoque']);
          }, 2500);
        },
        error: (error) => {
          this.messageService.add({
            key: 'tr',
            severity: 'error',
            summary: 'Erro',
            detail: error.error.message || 'Erro ao adicionar produto',
          });
        },
      });
    }
  }

  voltar() {
    this.produtoForm.reset();
    this.router.navigate(['/estoque']);
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
