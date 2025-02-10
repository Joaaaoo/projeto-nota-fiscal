using System.Collections.Generic;

namespace FaturamentoService.Models
{
    public class NotaFiscal
    {
        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime DataEmissao { get; set; } 

        public List<ItemNotaFiscal> Itens { get; set; } 
    }
}
