using FaturamentoService;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os servi�os do projeto
builder.Services.AddProjectServices(builder.Configuration);

var app = builder.Build();

// Endpoint de health check
app.MapHealthChecks("/health");

// Configura��o do pipeline de requisi��es HTTP
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();

// Use CORS
app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
