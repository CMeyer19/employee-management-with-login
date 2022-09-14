using EmployeeManager.Infrastructure.Models;
using EmployeeManager.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EmployeeManager.Service.Controllers;

[Route("api/[controller]")]
public class PeopleController : Controller
{
    private readonly PersonService _personService;

    public PeopleController(PersonService personService)
    {
        _personService = personService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        return Ok(await _personService.GetAllAsync(cancellationToken));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await _personService.GetAsync(id, cancellationToken));
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] Person person, CancellationToken cancellationToken)
    {
        var result = await _personService.AddAsync(new Domain.Entities.Person { FirstName = person.FirstName, LastName = person.LastName }, cancellationToken);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync([FromBody] Person person, CancellationToken cancellationToken)
    {
        await _personService.UpdateAsync(new Domain.Entities.Person { FirstName = person.FirstName, LastName = person.LastName }, cancellationToken);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        await _personService.DeleteAsync(id, cancellationToken);
        return Ok();
    }
}