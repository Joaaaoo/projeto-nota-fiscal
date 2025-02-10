using EstoqueService.DTOs;
using EstoqueService.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstoqueService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutoService _service;

        public ProdutosController(ProdutoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ListarProdutos()
        {
            try
            {
                var produtos = await _service.ListarProdutos();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the products: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarProdutoPorId(int id)
        {
            try
            {
                var produto = await _service.BuscarProdutoPorId(id);
                if (produto == null)
                {
                    return NotFound();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the product: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CadastrarProduto([FromBody] ProdutoDTO produtoDTO)
        {
            try
            {
                var produto = await _service.CadastrarProduto(produtoDTO);
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the product: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarProduto(int id, [FromBody] AtualizarProdutoDTO atualizarDTO)
        {
            try
            {
                var produto = await _service.AtualizarProduto(id, atualizarDTO);
                if (produto == null)
                {
                    return NotFound();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the product: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirProduto(int id)
        {
            try
            {
                var resultado = await _service.ExcluirProduto(id);
                if (!resultado)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the product: {ex.Message}");
            }
        }
    }
}
