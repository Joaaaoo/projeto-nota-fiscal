using System.Collections.Generic;

namespace FaturamentoService.DTOs
{
    public class NotaFiscalDTO
    {
        public int Id { get; set; }  
        public string NomeCliente { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime DataEmissao { get; set; }  
        public List<ItemNotaFiscalDTO> Itens { get; set; }
    }

}