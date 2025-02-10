using FaturamentoService.Clients;
using FaturamentoService.Data;
using FaturamentoService.Repositories;
using FaturamentoService.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FaturamentoService
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Registro do FaturamentoContext
            services.AddDbContext<FaturamentoContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

            // Registro do HttpClient
            services.AddHttpClient<EstoqueClient>();


            services.AddScoped<NotaFiscalService>();
            services.AddScoped<INotaFiscalRepository, NotaFiscalRepository>();

            // Registro do HttpClient com BaseAddress
            services.AddHttpClient<EstoqueClient>(client =>
            {
                client.BaseAddress = new Uri(configuration["EstoqueService:BaseUrl"]);
            });

            services.AddScoped<RabbitMQSender>();

            // Health Checks todo: verificar
            services.AddHealthChecks();

            // Configuração do CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });
            // Outros serviços
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            return services;
        }
    }
}
