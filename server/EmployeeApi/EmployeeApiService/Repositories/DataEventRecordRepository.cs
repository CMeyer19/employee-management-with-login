using System;
using System.Collections.Generic;
using System.Linq;
using ResourceServer.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ResourceServer.Repositories;

public class PeopleRepository
{
    private readonly PersonContext _context;
    private readonly ILogger _logger;

    public PeopleRepository(
        PersonContext context,
        ILoggerFactory loggerFactory
    )
    {
        _context = context;
        _logger = loggerFactory.CreateLogger("PeopleResporitory");
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

    public void Post(Person person)
    {
        _context.People.Add(person);
        _context.SaveChanges();
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