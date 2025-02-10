using EstoqueService;
using EstoqueService.Services;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços do projeto com injeção de dependência
builder.Services.AddProjectServices(builder.Configuration);

var app = builder.Build();

// Iniciar consumidor do RabbitMQ
using (var scope = app.Services.CreateScope())
{
    var rabbitMQConsumer = scope.ServiceProvider.GetRequiredService<RabbitMQConsumer>();
    rabbitMQConsumer.StartConsuming();
}

// Endpoint de health check todo: verificar 
app.MapHealthChecks("/health");


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
