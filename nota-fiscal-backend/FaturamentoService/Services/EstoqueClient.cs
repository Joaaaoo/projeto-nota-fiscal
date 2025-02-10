using EstoqueService.DTOs;
using EstoqueService.Models;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace FaturamentoService.Clients
{
    public class EstoqueClient
    {
        private readonly HttpClient _httpClient;

        public EstoqueClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<ProdutoDTO>> ObterTodosProdutos()
        {
            var response = await _httpClient.GetAsync($"/api/produtos");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<ProdutoDTO>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        // Método para buscar um produto no EstoqueService
        public async Task<Produto?> BuscarProduto(int produtoId)
        {
            var response = await _httpClient.GetAsync($"/api/produtos/{produtoId}");
            if (!response.IsSuccessStatusCode)
            {
                return null; 
            }
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Produto>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }

        // Método para atualizar o estoque de um produto com rabbit mq
        public async Task<bool> AtualizarEstoque(int produtoId, int quantidade)
        {
            var payload = new { quantidade };
            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync($"/api/produtos/{produtoId}/estoque", content);
            return response.IsSuccessStatusCode;
        }
    }
}
