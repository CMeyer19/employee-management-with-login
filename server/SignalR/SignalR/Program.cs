using MassTransit;
using Server;
using SignalR.RabbitMQ;
using SignalR.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(x =>
{
    x
    .AddConsumer<SignalRMessageConsumer>(typeof(SignalRMessageConsumerDefinition))
    .Endpoint(e =>
    {
        e.InstanceId = "signalr";
    });

    x.SetKebabCaseEndpointNameFormatter();

    x.UsingRabbitMq((context, cfg) => cfg.ConfigureEndpoints(context));
});
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder
                .AllowCredentials()
                .WithOrigins("https://localhost:4200")
                .SetIsOriginAllowedToAllowWildcardSubdomains()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services.AddHostedService<Worker>();

var app = builder.Build();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapHub<MessageHub>("/chatHub");

app.Run();
