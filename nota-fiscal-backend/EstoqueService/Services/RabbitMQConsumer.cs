using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using EstoqueService.Repositories;
using System.Text.Json;
using System.Text;

namespace EstoqueService.Services
{
    public class RabbitMQConsumer : IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly IServiceProvider _serviceProvider; 

        public RabbitMQConsumer(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            var factory = new ConnectionFactory() { HostName = "rabbitmq" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(queue: "atualizar-estoque", durable: true, exclusive: false, autoDelete: true);
        }

        public void StartConsuming()
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                using (var scope = _serviceProvider.CreateScope()) // Criar escopo manual
                {
                    try
                    {
                        var produtoRepository = scope.ServiceProvider.GetRequiredService<IProdutoRepository>();

                        var body = ea.Body.ToArray();
                        var message = Encoding.UTF8.GetString(body);
                        var items = JsonSerializer.Deserialize<List<FaturamentoService.DTOs.ItemNotaFiscalDTO>>(message);

                        foreach (var item in items)
                        {
                            var produto = await produtoRepository.BuscarProdutoPorId(item.ProdutoId);
                            if (produto != null)
                            {
                                await produtoRepository.AtualizarProduto(item.ProdutoId, produto.Nome, produto.Preco, produto.QuantidadeEstoque - item.Quantidade);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // rejeitar mensagem e reenfileirar
                        _channel.BasicNack(ea.DeliveryTag, false, true);
                        Console.WriteLine($"An error occurred while processing the message: {ex.Message}");
                    }
                }
            };

            _channel.BasicConsume(queue: "atualizar-estoque", autoAck: true, consumer: consumer);
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
}
