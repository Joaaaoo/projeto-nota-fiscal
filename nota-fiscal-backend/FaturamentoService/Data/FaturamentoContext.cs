using FaturamentoService.Models;
using Microsoft.EntityFrameworkCore;

namespace FaturamentoService.Data
{
    public class FaturamentoContext : DbContext
    {
        public DbSet<NotaFiscal> NotasFiscais { get; set; }
        public DbSet<ItemNotaFiscal> ItensNotaFiscal { get; set; }

        public FaturamentoContext(DbContextOptions<FaturamentoContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItemNotaFiscal>()
                .HasOne(i => i.NotaFiscal)
                .WithMany(n => n.Itens)
                .HasForeignKey(i => i.NotaFiscalId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=Data/faturamento.db"); // Caminho relativo
        }
    }
}