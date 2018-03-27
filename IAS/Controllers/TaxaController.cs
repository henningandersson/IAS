using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InvasiveSpecies.Controllers
{
  [Route("api/[controller]")]
  public class TaxaController : Controller
  {
    // GET api/values
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<dynamic>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    public async Task<IActionResult> Get()
    {
     return await Task.Run(() =>
      {
        return new OkObjectResult(new[]
        {
          new
          {
            Author = "Test",
            CommonName = "Varg",
            DisplayName = "Canis Lupus (varg)",
            ScientificName = "Canis Lupus",
            TaxonId = 100024
          }
        });
      });
    }
  }
}
