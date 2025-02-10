using EstoqueService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstoqueService.Repositories
{
    public interface IProdutoRepository
    {
        Task<Produto> CadastrarProduto(Produto produto);
        Task<List<Produto>> ListarProdutos();
        Task<Produto> BuscarProdutoPorId(int id);
        Task<Produto> AtualizarProduto(int id, string nome, decimal preco, int quantidade); 
        Task<bool> ExcluirProduto(int id); 
    }
}