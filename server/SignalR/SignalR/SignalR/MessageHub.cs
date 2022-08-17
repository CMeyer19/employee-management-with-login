using Microsoft.AspNetCore.SignalR;

namespace SignalR.SignalR
{
    public class MessageHub : Hub
    {
        public async Task SendMessage(string user, string message) => await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
