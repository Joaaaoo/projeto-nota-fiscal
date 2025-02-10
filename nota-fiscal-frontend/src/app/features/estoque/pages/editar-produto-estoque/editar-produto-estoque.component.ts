import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-editar-produto-estoque',
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
  templateUrl: './editar-produto-estoque.component.html',
  styleUrl: './editar-produto-estoque.component.css',
  providers: [MessageService],
  animations: [fadeInAnimation, fadeInOut],
})
export class EditarProdutoEstoqueComponent implements OnInit {
  produtoForm!: FormGroup;
  produtoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private estoqueService: EstoqueService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.scrollToTop();
    this.criarFormulario();
    this.carregarProduto();
  }

  criarFormulario() {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      quantidade: ['', [Validators.required, Validators.min(0)]],
    });
  }

  carregarProduto() {
    this.produtoId = this.route.snapshot.params['id'];
    this.estoqueService.getProdutoById(this.produtoId).subscribe({
      next: (produto) => this.produtoForm.patchValue(produto),
      error: (error) => {
        this.messageService.add({
          key: 'tr',
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produto',
        });
      },
    });
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      console.log(this.produtoForm.value);
      this.estoqueService
        .atualizarProduto(this.produtoId, this.produtoForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              key: 'tr',
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto atualizado com sucesso. Redirecionando...',
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
              detail: error.error.message || 'Erro ao atualizar produto',
            });
          },
        });
    }
  }

  deletarProduto() {
    this.estoqueService.deletarProduto(this.produtoId).subscribe({
      next: () => {
        this.messageService.add({
          key: 'tr',
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto deletado com sucesso. Redirecionando...',
        });
        of(null)
          .pipe(delay(2000))
          .subscribe(() => {
            this.router.navigate(['/estoque']);
          });
      },
      error: (error) => {
        this.messageService.add({
          key: 'tr',
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao deletar produto',
        });
      },
    });
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
