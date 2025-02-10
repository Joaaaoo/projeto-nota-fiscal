import { Routes } from '@angular/router';
import { EstoquePageComponent } from './features/estoque/pages/estoque-page/estoque-page.component';
import { AdicionarProdutoEstoqueComponent } from './features/estoque/pages/adicionar-produto-estoque/adicionar-produto-estoque.component';
import { EditarProdutoEstoqueComponent } from './features/estoque/pages/editar-produto-estoque/editar-produto-estoque.component';

import { PageErrorNotFoundComponent } from './features/layout/page-error-not-found/page-error-not-found.component';
import { FaturamentoPageComponent } from './features/faturamento/pages/faturamento-page/faturamento-page.component';
import { GerarNotaFiscalComponent } from './features/faturamento/pages/gerar-nota-fiscal/gerar-nota-fiscal.component';
import { VisualizarNotaFiscalComponent } from './features/faturamento/pages/visualizar-nota-fiscal/visualizar-nota-fiscal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/estoque', pathMatch: 'full' },

  { path: 'estoque', component: EstoquePageComponent },
  { path: 'adicionar-produto', component: AdicionarProdutoEstoqueComponent },
  { path: 'editar-produto/:id', component: EditarProdutoEstoqueComponent },

  { path: 'faturamento', component: FaturamentoPageComponent },
  { path: 'gerar-nota-fiscal', component: GerarNotaFiscalComponent },
  {
    path: 'visualizar-nota-fiscal/:id',
    component: VisualizarNotaFiscalComponent,
  },

  { path: '**', component: PageErrorNotFoundComponent },
];
