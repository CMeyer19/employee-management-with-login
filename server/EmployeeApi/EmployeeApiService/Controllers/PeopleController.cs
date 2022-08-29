using EmployeeManager.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using EmployeeManager.Service.Model;
using EmployeeManager.Infrastructure.Services;

namespace ResourceServer.Controllers;

[Authorize("controllerPolicy")]
[Route("api/[controller]")]
public class PeopleController : Controller
{
    private readonly PersonService _personService;

    public PeopleController(PersonService personService)
    {
        _personService = personService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_personService.GetPeople());
    }
}