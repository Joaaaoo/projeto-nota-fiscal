import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FaturamentoService } from '../../services/faturamento.service';
import { EstoqueService } from '../../../estoque/services/estoque.service';
import { MessageService } from 'primeng/api';
import { ComponenteTituloDinamicoComponent } from '../../../../shared/components/componente-titulo-dinamico/componente-titulo-dinamico.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { fadeInAnimation, fadeInOut } from '../../../../utils/animations';
import { catchError, Observable, of } from 'rxjs';
import { Produto } from '../../../estoque/models/produto.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-gerar-nota-fiscal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponenteTituloDinamicoComponent,
    PanelModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    Toast,
    ProgressSpinnerModule,
  ],
  templateUrl: './gerar-nota-fiscal.component.html',
  styleUrls: ['./gerar-nota-fiscal.component.css'],
  providers: [MessageService],
  animations: [fadeInAnimation, fadeInOut],
})
export class GerarNotaFiscalComponent implements OnInit {
  notaFiscalForm!: FormGroup;
  produtos$!: Observable<Produto[]>;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private faturamentoService: FaturamentoService,
    private estoqueService: EstoqueService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.scrollToTop();
    this.carregarProdutos();
    this.criarFormulario();
  }

  carregarProdutos() {
    this.produtos$ = this.estoqueService.getProdutos().pipe(
      catchError((error) => {
        this.messageService.add({
          key: 'tr',
          severity: 'error',
          summary: 'Erro',
          detail: error.error.message || 'Erro ao carregar produtos',
          sticky: true,
        });
        return of([]);
      })
    );
  }
  criarFormulario() {
    this.notaFiscalForm = this.fb.group(
      {
        nomeCliente: ['', Validators.required],
        itens: this.fb.array([this.criarItem()]),
      },
      { validators: this.produtoDuplicadoValidator() }
    );
  }

  criarItem(): FormGroup {
    return this.fb.group({
      produtoId: [null, Validators.required],
      nomeProduto: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
    });
  }

  get itens(): FormArray {
    return this.notaFiscalForm.get('itens') as FormArray;
  }

  adicionarItem() {
    this.itens.push(this.criarItem());
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }

  atualizarNomeProduto(item: AbstractControl, produtoId: number) {
    this.produtos$.subscribe((produtos) => {
      const produto = produtos.find((p) => p.id === produtoId);
      item.get('nomeProduto')?.setValue(produto?.nome || '');
    });
  }

  produtoDuplicadoValidator(): ValidatorFn {
    return (form: AbstractControl): { [key: string]: any } | null => {
      const itens = form.get('itens') as FormArray;
      const produtoIds = itens.controls.map(
        (item) => item.get('produtoId')?.value
      );
      const hasDuplicates = produtoIds.some(
        (id, index) => produtoIds.indexOf(id) !== index
      );
      return hasDuplicates ? { produtoDuplicado: true } : null;
    };
  }

  onSubmit() {
    this.notaFiscalForm.markAllAsTouched();

    if (this.notaFiscalForm.valid) {
      this.loading = true;
      this.messageService.add({
        key: 'tr',
        severity: 'info',
        summary: 'Processando',
        detail: 'Aguarde enquanto a nota fiscal está sendo criada...',
        life: 30000,
      });
      this.faturamentoService
        .criarNotaFiscal(this.notaFiscalForm.value)
        .subscribe({
          next: (notaFiscal) => {
            this.loading = false;
            this.messageService.add({
              key: 'tr',
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Nota fiscal criada com sucesso. Redirecionando...',
              life: 30000,
            });
            setTimeout(() => {
              this.router.navigate(['/faturamento']);
            }, 2000);
          },
          error: (error) => {
            this.loading = false;
            this.messageService.add({
              key: 'tr',
              severity: 'error',
              summary: 'Erro',
              detail: error.error.message || 'Erro ao criar nota fiscal',
              life: 30000,
            });
          },
        });
    } else {
      this.messageService.add({
        key: 'tr',
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios',
      });
    }
  }

  voltar() {
    this.notaFiscalForm.reset();
    this.router.navigate(['/faturamento']);
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
