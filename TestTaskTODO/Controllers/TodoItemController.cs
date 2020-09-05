using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestTaskTODO.Controllers
{
    using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> Post([FromBody] string name)
        {
            var todoItem = new TodoItem()
                           {
                                   Name = name
                           };

            this.db.Add(todoItem);
            await this.db.SaveChangesAsync();

            return Ok();
        }

        // PUT api/<TodoItemController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id)
        {
            var updateTodoItem = await this.db.TodoItems.SingleOrDefaultAsync(a => a.Id == id);
            if (updateTodoItem == null)
                return NotFound();

            updateTodoItem.Completed = !updateTodoItem.Completed;
            this.db.Update(updateTodoItem);
            await this.db.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/<TodoItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
