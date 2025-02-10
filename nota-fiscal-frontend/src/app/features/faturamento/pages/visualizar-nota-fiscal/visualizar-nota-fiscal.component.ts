import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaturamentoService } from '../../services/faturamento.service';
import { NotaFiscal } from '../../models/nota-fiscal.model';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ComponenteTituloDinamicoComponent } from '../../../../shared/components/componente-titulo-dinamico/componente-titulo-dinamico.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ToolbarModule } from 'primeng/toolbar';
import { fadeInAnimation, fadeInOut } from '../../../../utils/animations';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-visualizar-nota-fiscal',
  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    Toast,
    ComponenteTituloDinamicoComponent,
    DialogModule,
  ],
  templateUrl: './visualizar-nota-fiscal.component.html',
  styleUrls: ['./visualizar-nota-fiscal.component.css'],
  providers: [MessageService],
  animations: [fadeInAnimation, fadeInOut],
})
export class VisualizarNotaFiscalComponent implements OnInit {
  notaFiscal!: NotaFiscal;

  constructor(
    private route: ActivatedRoute,
    private faturamentoService: FaturamentoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.scrollToTop();
    this.obterNotaFiscal();
  }

  obterNotaFiscal() {
    const id = this.route.snapshot.params['id'];
    this.faturamentoService.getNotaFiscalById(id).subscribe({
      next: (notaFiscal) => {
        this.notaFiscal = notaFiscal;
      },
      error: (error) => {
        this.messageService.add({
          key: 'tr',
          severity: 'error',
          summary: 'Erro',
          detail: error.error.message || 'Erro ao visualizar nota fiscal',
        });
      },
    });
  }

  gerarPDF() {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(18);
    doc.text('Nota Fiscal', 105, 10, { align: 'center' });

    // Informações do cliente
    doc.setFontSize(12);
    doc.text(`Nota Fiscal #${this.notaFiscal.id}`, 10, 20);
    doc.text(`Nome do Cliente: ${this.notaFiscal.nomeCliente}`, 10, 30);
    doc.text(`Valor Total: ${this.notaFiscal.valorTotal}`, 10, 40);
    doc.text(
      `Data de Emissão: ${new Date(
        this.notaFiscal.dataEmissao
      ).toLocaleString()}`,
      10,
      50
    );

    // Tabela de itens
    const itens = this.notaFiscal.itens.map((item) => [
      item.quantidade,
      item.nomeProduto,
      item.precoUnitario,
      item.precoTotal,
    ]);

    (doc as any).autoTable({
      head: [['Quantidade', 'Produto', 'Preço Unitário', 'Preço Total']],
      body: itens,
      startY: 60,
    });

    // Rodapé
    doc.setFontSize(10);
    doc.text(
      'Obrigado pela sua compra!',
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );

    const pdfOutput = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfOutput);
    window.open(pdfUrl, '_blank');
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
