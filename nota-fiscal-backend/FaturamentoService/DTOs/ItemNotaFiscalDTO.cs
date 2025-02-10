namespace FaturamentoService.DTOs
{
    public class ItemNotaFiscalDTO
    {
        public int Id { get; set; } 
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string? NomeProduto { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal PrecoTotal { get; set; }
        public int NotaFiscalId { get; set; }
    }
}
