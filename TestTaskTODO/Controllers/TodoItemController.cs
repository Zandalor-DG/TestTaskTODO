

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestTaskTODO.Controllers
{
    #region << Using >>

    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using TestTaskTODO.Model;

    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemController : ControllerBase
    {
        #region Properties

        private readonly ApplicationContext db;

        #endregion

        #region Constructors

        public TodoItemController(ApplicationContext context)
        {
            this.db = context;
        }

        #endregion

        // POST api/<TodoItemController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoItemPost model)
        {
            var todoList = await this.db.TodoLists.Include(a => a.Items)
                                     .SingleOrDefaultAsync(a => a.Id == int.Parse(model.TodoListId));
            if (model.Name == null)
            {
                return NotFound();
            }
            else
            {
                todoList.Items.Add(new TodoItem()
                                        {
                                            Name = model.Name,
                                            Completed = false,
                                            ToDoList = todoList
                                        });

                this.db.Update(todoList);
            }

            await this.db.SaveChangesAsync();

            return Ok();
        }

        // PUT api/<TodoItemController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] TodoItemPut model)
        {
            var updateTodoItem = await this.db.TodoItems.SingleOrDefaultAsync(a => a.Id == model.itemId);
            if (updateTodoItem == null)
                return NotFound();

            updateTodoItem.Completed = true;
            this.db.Update(updateTodoItem);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}