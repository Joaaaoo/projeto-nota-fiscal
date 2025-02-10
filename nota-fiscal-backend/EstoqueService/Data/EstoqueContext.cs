using Microsoft.EntityFrameworkCore;
using EstoqueService.Models;

namespace EstoqueService.Data
{
    public class EstoqueContext : DbContext
    {
        // Construtor 
        public EstoqueContext(DbContextOptions<EstoqueContext> options) : base(options)
        {
        }

        // Representa a tabela de produtos no banco de dados
        public DbSet<Produto> Produtos { get; set; }

     
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Produto>()
                .HasKey(p => p.Id); // Define a chave primária
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=Data/estoque.db"); // Caminho relativo pro db
        }
    }
}