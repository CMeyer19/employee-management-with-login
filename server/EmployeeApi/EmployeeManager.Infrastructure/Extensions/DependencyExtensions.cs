using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Infrastructure.Extensions;

//public static IServiceCollection AddInfrastructure(this IServiceCollection serviceCollection, IConfiguration configuration)
//{
//    serviceCollection.AddUserClient(configuration);
//    serviceCollection.AddTransient<IUserResolver, UserResolver>();

//    serviceCollection.AddHttpContextAccessor()
//        .AddScoped<IRequestContext, HttpRequestContext>();

//    serviceCollection.AddTransient<IAuditService, AuditService>();
//    serviceCollection.AddAuditLogNotification();

//    serviceCollection.AddTransient<IMessageQueueClient, RabbitMessageQueueClient>();
//    serviceCollection.AddDapiRedGreenQueue(configuration);
//    serviceCollection.AddAccountValidationClient(configuration);

//    serviceCollection.AddTransient<IPolicyValidator, PolicyValidator>();
//    serviceCollection.AddTransient<IDeploymentContext, DeploymentContext>();

//    return serviceCollection;
//}

//public static IServiceCollection AddRepositories(this IServiceCollection serviceCollection, IConfiguration configuration)
//{
//    serviceCollection.Configure<DataOptions>(configuration.GetSection(nameof(DataOptions)));

//    serviceCollection.AddSingleton<IAccountRepository, AccountRepository>();
//    serviceCollection.AddSingleton<MongoMapperBase<Account>, AccountMapping>();

//    return serviceCollection;
//}
