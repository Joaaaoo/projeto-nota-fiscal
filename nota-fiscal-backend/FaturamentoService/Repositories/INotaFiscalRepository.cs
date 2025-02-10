using FaturamentoService.DTOs;
using FaturamentoService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FaturamentoService.Repositories
{
    public interface INotaFiscalRepository
    {
        Task<NotaFiscal> CadastrarNotaFiscal(NotaFiscalDTO notaFiscalDTO);
        Task<List<NotaFiscal>> ListarNotasFiscais();
        Task<NotaFiscal> BuscarNotaFiscalPorId(int id);
        Task<bool> ExcluirNotaFiscal(int id);
    }
}