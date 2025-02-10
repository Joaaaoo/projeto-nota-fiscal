export interface NotaFiscal {
  id: number;
  nomeCliente: string;
  valorTotal: number;
  dataEmissao: string;
  itens: ItemNotaFiscal[];
}

export interface ItemNotaFiscal {
  id: number;
  produtoId: number;
  quantidade: number;
  nomeProduto: string;
  precoUnitario: number;
  precoTotal: number;
  notaFiscalId: number;
}
