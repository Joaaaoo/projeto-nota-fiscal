using EstoqueService.DTOs;
using EstoqueService.Models;
using EstoqueService.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstoqueService.Services
{
    public class ProdutoService
    {
        private readonly IProdutoRepository _repository;

        public ProdutoService(IProdutoRepository repository)
        {
            _repository = repository;
        }

        public async Task<Produto> CadastrarProduto(ProdutoDTO produtoDTO)
        {
            var produto = new Produto
            {
                Nome = produtoDTO.Nome,
                Preco = produtoDTO.Preco,
                QuantidadeEstoque = produtoDTO.QuantidadeEstoque
            };
            return await _repository.CadastrarProduto(produto);
        }

        public async Task<List<Produto>> ListarProdutos()
        {
            return await _repository.ListarProdutos();
        }

        public async Task<Produto> BuscarProdutoPorId(int id)
        {
            return await _repository.BuscarProdutoPorId(id);
        }

        public async Task<Produto> AtualizarProduto(int id, AtualizarProdutoDTO atualizarDTO)
        {
            return await _repository.AtualizarProduto(id, atualizarDTO.Nome, atualizarDTO.Preco, atualizarDTO.Quantidade);
        }

        public async Task<bool> ExcluirProduto(int id)
        {
            return await _repository.ExcluirProduto(id);
        }
    }
}