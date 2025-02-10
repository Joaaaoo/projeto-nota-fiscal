using FaturamentoService.DTOs;
using FaturamentoService.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;
using System;

namespace FaturamentoService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotasFiscaisController : ControllerBase
    {
        private readonly NotaFiscalService _service;
        private readonly RabbitMQSender _rabbitMQSender;

        public NotasFiscaisController(NotaFiscalService service, RabbitMQSender rabbitMQSender)
        {
            _service = service;
            _rabbitMQSender = rabbitMQSender;
        }

        [HttpGet]
        public async Task<IActionResult> ListarNotasFiscais()
        {
            try
            {
                var notasFiscais = await _service.ListarNotasFiscais();
                return Ok(notasFiscais);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro inesperado ao listar notas fiscais: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarNotaFiscalPorId(int id)
        {
            try
            {
                var notaFiscal = await _service.BuscarNotaFiscalPorId(id);
                if (notaFiscal == null)
                {
                    return NotFound(new { message = "Nota fiscal não encontrada" });
                }
                return Ok(notaFiscal);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro inesperado ao buscar nota fiscal: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CadastrarNotaFiscal([FromBody] NotaFiscalDTO notaFiscalDTO)
        {
            try
            {
                var notaFiscal = await _service.CadastrarNotaFiscal(notaFiscalDTO);

                // Publicar mensagem de atualização de estoque rabbit
                var message = JsonSerializer.Serialize(notaFiscalDTO.Itens);
                _rabbitMQSender.PublicarMensagemAtualizacaoEstoque(message);

                return Ok(notaFiscal);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro inesperado ao cadastrar nota fiscal: {ex.Message}" });
            }
        }
    }
}
