using EstoqueService.Data;
using EstoqueService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstoqueService.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly EstoqueContext _context;

        public ProdutoRepository(EstoqueContext context)
        {
            _context = context;
        }

        public async Task<Produto> CadastrarProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<List<Produto>> ListarProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        public async Task<Produto> BuscarProdutoPorId(int id)
        {
            return await _context.Produtos.FindAsync(id);
        }

        public async Task<Produto> AtualizarProduto(int id, string nome, decimal preco, int quantidade)
        {
            var produto = await _context.Produtos.FindAsync(id);
           
            if (produto != null)
            {
                if (!string.IsNullOrEmpty(nome))
                {
                    produto.Nome = nome;
                }
                if (preco >= 0)
                {
                    produto.Preco = preco;
                }
                produto.QuantidadeEstoque = quantidade;
                await _context.SaveChangesAsync();
            }

            return produto;
        }

        public async Task<bool> ExcluirProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
            {
                return false; 
            }

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
            return true; 
        }
    }
}
