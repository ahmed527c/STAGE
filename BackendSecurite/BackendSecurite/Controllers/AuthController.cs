using BackendSecurite.Data;
using BackendSecurite.Models;
using Microsoft.AspNetCore.Mvc;


namespace BackendSecurite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context) => _context = context;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Utilisateur utilisateur)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (_context.Utilisateurs.Any(u => u.Email == utilisateur.Email)) return BadRequest("Email déjà utilisé.");
            _context.Utilisateurs.Add(utilisateur);
            await _context.SaveChangesAsync();

            return Ok(new { utilisateur.Id, utilisateur.Nom });
        }

        [HttpPost("login")]
        public IActionResult Login( LoginRequest request)
        {
            var user = _context.Utilisateurs.FirstOrDefault(u => u.Email == request.Email && u.PasswordHash == request.Password);
            if (user == null) return Unauthorized("Email ou mot de passe incorrect.");

            return Ok(new { userId = user.Id,user.Role });
        }

        public class LoginRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
    }
}
