using ResourceServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using EmployeeManager.Service.Model;

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
    public async Task<IActionResult> PostAsync([FromBody] Person value)
    {
        var result = await _peopleRepository.Post(value);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public void Put(Guid id, [FromBody] Person value)
    {
        _peopleRepository.Put(id, value);
    }

    [HttpDelete("{id}")]
    public void Delete(Guid id)
    {
        _peopleRepository.Delete(id);
    }
}