using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorController : BaseApiController
    {
        private readonly DataContext _context;
        public ErrorController(DataContext context)
        {
            _context = context;

        }
        
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret(){
            return "secret";
        }

        [HttpGet("not-found")]
        public async Task<ActionResult<AppUser>> GetNotFound(){
            var thing = await _context.Users.FindAsync(-1);
            if(thing == null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public async Task<ActionResult<string>> GetServerError(){
            var thing = await _context.Users.FindAsync(-1);

            var thingToReturn = thing.ToString();

            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return BadRequest("This is a bad request for testing");
        }
    }
}