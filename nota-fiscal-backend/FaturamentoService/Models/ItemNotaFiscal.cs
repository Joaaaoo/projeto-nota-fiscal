using System.Text.Json.Serialization;

namespace FaturamentoService.Models
{
    public class ItemNotaFiscal
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string NomeProduto { get; set; } 
        public decimal PrecoUnitario { get; set; } 
        public decimal PrecoTotal { get; set; } 


        // navegação
        public int NotaFiscalId { get; set; }
        [JsonIgnore]
        public NotaFiscal NotaFiscal { get; set; }
    }
}