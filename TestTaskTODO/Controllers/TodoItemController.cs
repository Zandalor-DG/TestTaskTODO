using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestTaskTODO.Controllers
{
    using TestTaskTODO.Model;

    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemController : ControllerBase
    {

        #region Properties

        private ApplicationContext db;

        #endregion

        #region Constructors

        public TodoItemController(ApplicationContext context)
        {
            this.db = context;
        }

        #endregion

        // POST api/<TodoItemController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TodoItemController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TodoItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
