using System;
using System.Collections.Generic;
using System.Linq;
using ResourceServer.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MassTransit;
using System.Threading.Tasks;
using SharedAbstractions;
using EmployeeManager.Service.Model;

namespace ResourceServer.Repositories;

public class PeopleRepository
{
    private readonly PersonContext _context;
    private readonly ILogger _logger;
    private readonly IPublishEndpoint _publishEndpoint;

    public PeopleRepository(
        PersonContext context,
        ILoggerFactory loggerFactory,
       IPublishEndpoint publishEndpoint
    )
    {
        _context = context;
        _logger = loggerFactory.CreateLogger("PeopleResporitory");
        _publishEndpoint = publishEndpoint;
    }

    public List<Person> GetAll()
    {
        _logger.LogCritical("Getting a the existing records");
        var data = _context.People.ToList();

        return data;
    }

    public Person Get(Guid id)
    {
        var person = _context.People.First(t => t.Id == id);
        return person;
    }

    public async Task<Guid> Post(Person person)
    {
        _context.People.Add(person);
        _context.SaveChanges();

        await _publishEndpoint.Publish(new SignalRMessage { Event = "UserAdded" });

        return person.Id;
    }

    public void Put(Guid id, [FromBody] Person person)
    {
        _context.People.Update(person);
        _context.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var entity = _context.People.First(t => t.Id == id);
        _context.People.Remove(entity);
        _context.SaveChanges();
    }
}