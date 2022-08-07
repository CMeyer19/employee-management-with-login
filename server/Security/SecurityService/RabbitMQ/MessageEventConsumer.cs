using MassTransit;

namespace SecurityService.RabbitMQ
{
    public class MessageEventConsumer : IConsumer<MessageEvent>
    {
        public Task Consume(ConsumeContext<MessageEvent> context)
        {
            return Task.CompletedTask;
        }
    }
}
