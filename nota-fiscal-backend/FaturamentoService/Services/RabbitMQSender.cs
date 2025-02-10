using RabbitMQ.Client;
using System;
using System.Text;

public class RabbitMQSender : IDisposable
{
    private readonly IConnection _connection;
    private readonly IModel _channel;

    public RabbitMQSender()
    {
        var factory = new ConnectionFactory() { HostName = "rabbitmq" };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        _channel.QueueDeclare(
            queue: "atualizar-estoque",
            durable: true,
            exclusive: false,
            autoDelete: true,
            arguments: null
        );
    }

    public void PublicarMensagemAtualizacaoEstoque(string message)
    {
        try
        {
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(
                exchange: "",
                routingKey: "atualizar-estoque",
                basicProperties: null,
                body: body
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao publicar mensagem: {ex.Message}");
        }
    }

    public void PublicarMensagemAtualizacaoEstoque(int produtoId, int quantidade, string acao)
    {
        try
        {
            var message = $"{{\"produtoId\": {produtoId}, \"quantidade\": {quantidade}, \"acao\": \"{acao}\"}}";
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(
                exchange: "",
                routingKey: "atualizar-estoque",
                basicProperties: null,
                body: body
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao publicar mensagem: {ex.Message}");
        }
    }

    public void Dispose()
    {
        _channel?.Close();
        _connection?.Close();
    }
}
