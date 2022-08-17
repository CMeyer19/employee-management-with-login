using MassTransit;
using Microsoft.AspNetCore.SignalR;
using SharedAbstractions;
using SignalR.SignalR;

namespace SignalR.RabbitMQ
{
    public class SignalRMessageConsumer : IConsumer<SignalRMessage>
    {
        private readonly ILogger<SignalRMessageConsumer> _logger;
        private readonly IHubContext<MessageHub> _hubContext;

        public SignalRMessageConsumer(
            ILogger<SignalRMessageConsumer> logger,
            IHubContext<MessageHub> hubContext
        )
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<SignalRMessage> context)
        {
            _logger.LogInformation("RabbitMQ message recieved, triggering signalR message: {Value}", context.Message.Event);
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", context.Message.Event);
        }
    }

    class SignalRMessageConsumerDefinition : ConsumerDefinition<SignalRMessageConsumer>
    {
        protected override void ConfigureConsumer(
            IReceiveEndpointConfigurator endpointConfigurator,
            IConsumerConfigurator<SignalRMessageConsumer> consumerConfigurator
        )
        {
            // configure message retry with millisecond intervals
            endpointConfigurator.UseMessageRetry(r => r.Intervals(100, 200, 500, 800, 1000));

            // use the outbox to prevent duplicate events from being published
            endpointConfigurator.UseInMemoryOutbox();
        }
    }
}
