using Microsoft.AspNetCore.Http;
using FSK.Repository.Services;
using Microsoft.AspNetCore.Mvc;

namespace FSK.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FengShuiController : ControllerBase
    {
        private readonly FengShuiService _fengShuiService;

        public FengShuiController(FengShuiService fengShuiService)
        {
            _fengShuiService = fengShuiService;
        }

        /// <summary>
        /// Calculate Feng Shui Element based on Can and Chi.
        /// </summary>
        /// <param name="can">The Heavenly Stem (Thiên Can)</param>
        /// <param name="chi">The Earthly Branch (Địa Chi)</param>
        /// <returns>The calculated Feng Shui element.</returns>
        [HttpGet("calculate")]
        public IActionResult CalculateFengShui([FromQuery] string can, [FromQuery] string chi)
        {
            try
            {
                var result = _fengShuiService.CalculateFengShui(can, chi);
                return Ok(new { message = result });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
        }

    }
}
