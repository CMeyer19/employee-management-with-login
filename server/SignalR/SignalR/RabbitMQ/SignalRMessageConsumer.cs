using MassTransit;
using SharedAbstractions;

namespace SignalR.RabbitMQ
{
    public class SignalRMessageConsumer : IConsumer<SignalRMessage>
    {
        readonly ILogger<SignalRMessageConsumer> _logger;

        public SignalRMessageConsumer(ILogger<SignalRMessageConsumer> logger)
        {
            _logger = logger;
        }

        public async Task Consume(ConsumeContext<SignalRMessage> context)
        {
            _logger.LogInformation("Event Fired: {Value}", context.Message.Event);
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
