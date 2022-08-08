using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.SignalR;

namespace SignalR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IHubContext<ChatHub> _hubContext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IHubContext<ChatHub> hubContext)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task SetValue([FromBody] string value)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", $"Home page loaded at: {DateTime.Now}");
        }
    }
}