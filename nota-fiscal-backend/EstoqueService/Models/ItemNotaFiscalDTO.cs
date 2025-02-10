namespace FaturamentoService.DTOs
{
    public class ItemNotaFiscalDTO
    {
        public int ProdutoId { get; set; } // ID do produto (referência ao EstoqueService)
        public string NomeProduto { get; set; } // Nome do produto
        public int Quantidade { get; set; } // Quantidade do produto
        public decimal PrecoUnitario { get; set; } // Preço unitário do produto
        public decimal PrecoTotal { get; set; } // Preço total (Quantidade * PrecoUnitario)
    }
}