using FaturamentoService.Data;
using FaturamentoService.DTOs;
using FaturamentoService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FaturamentoService.Repositories
{
    public class NotaFiscalRepository : INotaFiscalRepository
    {
        private readonly FaturamentoContext _context;

        public NotaFiscalRepository(FaturamentoContext context)
        {
            _context = context;
        }

        public async Task<NotaFiscal> CadastrarNotaFiscal(NotaFiscalDTO notaFiscalDTO)
        {
            var notaFiscal = new NotaFiscal
            {
                NomeCliente = notaFiscalDTO.NomeCliente,
                DataEmissao = DateTime.UtcNow,
                Itens = notaFiscalDTO.Itens.Select(i => new ItemNotaFiscal
                {
                    ProdutoId = i.ProdutoId,
                    NomeProduto = i.NomeProduto,
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario,
                    PrecoTotal = i.PrecoTotal
                }).ToList()
            };

            // Calcular o valor total da nota fiscal
            notaFiscal.ValorTotal = notaFiscal.Itens.Sum(i => i.PrecoTotal);

            _context.NotasFiscais.Add(notaFiscal);
            await _context.SaveChangesAsync();
            return notaFiscal;
        }

        public async Task<List<NotaFiscal>> ListarNotasFiscais()
        {
            return await _context.NotasFiscais
                .Include(n => n.Itens) 
                .ToListAsync();
        }

        public async Task<NotaFiscal> BuscarNotaFiscalPorId(int id)
        {
            return await _context.NotasFiscais
                .Include(n => n.Itens)
                .FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<bool> ExcluirNotaFiscal(int id)
        {
            var notaFiscal = await _context.NotasFiscais.FindAsync(id);
            if (notaFiscal == null)
            {
                return false;
            }

            _context.NotasFiscais.Remove(notaFiscal);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
