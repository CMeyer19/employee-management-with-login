using ResourceServer.Model;
using ResourceServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ResourceServer.Controllers;

[Authorize("controllerPolicy")]
[Route("api/[controller]")]
public class PeopleController : Controller
{
    private readonly PeopleRepository _peopleRepository;

    public PeopleController(PeopleRepository peopleRepository)
    {
        _peopleRepository = peopleRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_peopleRepository.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        return Ok(_peopleRepository.Get(id));
    }

    [HttpPost]
    public void Post([FromBody]Person value)
    {
        _peopleRepository.Post(value);
    }

    [HttpPut("{id}")]
    public void Put(Guid id, [FromBody]Person value)
    {
        _peopleRepository.Put(id, value);
    }

    [HttpDelete("{id}")]
    public void Delete(Guid id)
    {
        _peopleRepository.Delete(id);
    }
}