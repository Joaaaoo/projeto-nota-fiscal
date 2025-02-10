using FaturamentoService.Clients;
using FaturamentoService.DTOs;
using FaturamentoService.Models;
using FaturamentoService.Repositories;
using Polly;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FaturamentoService.Services
{
    public class NotaFiscalService
    {
        private readonly INotaFiscalRepository _repository;
        private readonly EstoqueClient _estoqueClient;
        private readonly RabbitMQSender _rabbitMQSender;
        private readonly AsyncPolicy _retryPolicy;

        public NotaFiscalService(
            INotaFiscalRepository repository,
            EstoqueClient estoqueClient,
            RabbitMQSender rabbitMQSender)
        {
            _repository = repository;
            _estoqueClient = estoqueClient;
            _rabbitMQSender = rabbitMQSender;

            // Configurar Polly para 3 tentativas 
            _retryPolicy = Policy
                .Handle<Exception>()
                .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        }

        // Método para cadastrar uma nova nota fiscal utilizando o EstoqueService e RabbitMQ
        public async Task<NotaFiscalDTO> CadastrarNotaFiscal(NotaFiscalDTO notaFiscalDTO)
        {
            NotaFiscal notaFiscal = new NotaFiscal();

            try
            {
                // Passo 1: Buscar todos os produtos do EstoqueService para preenchimento automático
                var produtos = await _estoqueClient.ObterTodosProdutos();

                // Passo 2: Validar estoque
                await _retryPolicy.ExecuteAsync(async () =>
                {
                    foreach (var item in notaFiscalDTO.Itens)
                    {
                        var produto = produtos.FirstOrDefault(p => p.Id == item.ProdutoId);
                        if (produto == null || produto.QuantidadeEstoque < item.Quantidade)
                        {
                            throw new Exception($"Saldo insuficiente para o produto {item.ProdutoId}.");
                        }
                    }
                });

                // Passo 3: Preencher os valores de PrecoUnitario e PrecoTotal
                foreach (var item in notaFiscalDTO.Itens)
                {
                    var produto = produtos.FirstOrDefault(p => p.Id == item.ProdutoId);
                    if (produto != null)
                    {
                        item.NomeProduto = produto.Nome;
                        item.PrecoUnitario = produto.Preco;
                        item.PrecoTotal = produto.Preco * item.Quantidade;
                    }
                }

                // Passo 4: Criar a nota fiscal preenchendo os campos corretamente
                notaFiscal = new NotaFiscal
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

                // Calcular o valor total da nota fiscal após a criação da lista de itens
                notaFiscal.ValorTotal = notaFiscal.Itens.Sum(i => i.PrecoTotal);

                // Persistir a nota fiscal no banco de dados
                notaFiscal = await _repository.CadastrarNotaFiscal(notaFiscalDTO);

                var notaFiscalResposta = new NotaFiscalDTO
                {
                    Id = notaFiscal.Id,
                    NomeCliente = notaFiscal.NomeCliente,
                    DataEmissao = notaFiscal.DataEmissao,
                    ValorTotal = notaFiscal.ValorTotal,
                    Itens = notaFiscal.Itens.Select(item => new ItemNotaFiscalDTO
                    {
                        Id = item.Id,
                        ProdutoId = item.ProdutoId,
                        Quantidade = item.Quantidade,
                        NomeProduto = item.NomeProduto,
                        PrecoUnitario = item.PrecoUnitario,
                        PrecoTotal = item.PrecoTotal,
                        NotaFiscalId = item.NotaFiscalId
                    }).ToList()
                };

                // Passo 5: Publicar mensagem para atualizar estoque
                foreach (var item in notaFiscalResposta.Itens)
                {
                    _rabbitMQSender.PublicarMensagemAtualizacaoEstoque(item.ProdutoId, item.Quantidade, "AtualizarEstoque");
                }

                return notaFiscalResposta;
            }
            catch (Exception ex)
            {
                // Compensação: Excluir nota fiscal se algo der errado
                if (notaFiscal != null && notaFiscal.Id != 0)
                {
                    await _repository.ExcluirNotaFiscal(notaFiscal.Id);
                }

                //lançar uma exceção específica para o cliente
                throw new InvalidOperationException("Erro ao cadastrar nota fiscal: " + ex.Message);
            }
        }

        public async Task<List<NotaFiscalDTO>> ListarNotasFiscais()
        {
            var notasFiscais = await _repository.ListarNotasFiscais();
            return notasFiscais.Select(nf => new NotaFiscalDTO
            {
                Id = nf.Id,
                NomeCliente = nf.NomeCliente,
                DataEmissao = nf.DataEmissao,
                ValorTotal = nf.ValorTotal,
                Itens = nf.Itens.Select(i => new ItemNotaFiscalDTO
                {
                    Id = i.Id,
                    ProdutoId = i.ProdutoId,
                    NomeProduto = i.NomeProduto,
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario,
                    PrecoTotal = i.PrecoTotal,
                    NotaFiscalId = i.NotaFiscalId
                }).ToList()
            }).ToList();
        }

        public async Task<NotaFiscalDTO> BuscarNotaFiscalPorId(int id)
        {
            var notaFiscal = await _repository.BuscarNotaFiscalPorId(id);
            if (notaFiscal == null)
            {
                return null;
            }

            return new NotaFiscalDTO
            {
                Id = notaFiscal.Id,
                NomeCliente = notaFiscal.NomeCliente,
                DataEmissao = notaFiscal.DataEmissao,
                ValorTotal = notaFiscal.ValorTotal,
                Itens = notaFiscal.Itens.Select(item => new ItemNotaFiscalDTO
                {
                    Id = item.Id,
                    ProdutoId = item.ProdutoId,
                    Quantidade = item.Quantidade,
                    NomeProduto = item.NomeProduto,
                    PrecoUnitario = item.PrecoUnitario,
                    PrecoTotal = item.PrecoTotal,
                    NotaFiscalId = item.NotaFiscalId
                }).ToList()
            };
        }
    }
}
