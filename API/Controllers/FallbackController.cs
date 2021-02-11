using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FallbackController : Controller // heredas deesta porque es de mvc y tiene view support
    {

        public ActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
             "wwwroot", "index.html"), "text/HTML");
        }

    }
}