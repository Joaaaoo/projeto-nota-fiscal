using EstoqueService.Data;
using EstoqueService.Repositories;
using EstoqueService.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EstoqueService
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Configuração do DbContext
            services.AddDbContext<EstoqueContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

            // Registro do repositorio e serviços
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddSingleton<RabbitMQConsumer>();
            services.AddScoped<ProdutoService>();

            // Health Checks - Todo: testar endpoints
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
