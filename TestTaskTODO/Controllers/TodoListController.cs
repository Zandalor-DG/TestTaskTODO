// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestTaskTODO.Controllers
{
    #region << Using >>

    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using TestTaskTODO.Model;

    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        #region Properties

        private readonly ApplicationContext db;

        #endregion

        #region Constructors

        public TodoListController(ApplicationContext context)
        {
            this.db = context;
        }

        #endregion

        // GET: api/<TodoListController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var todoList = await this.db.TodoLists.Include(a => a.Items).ToListAsync();
            var todoListVM = todoList.Select(a =>
                                                     new TodoListVM()
                                                     {
                                                             Id = a.Id,
                                                             Name = a.Name,
                                                             CountAllItems = a.Items.Count,
                                                             CompletedItemsCount = a.Items.Count(b => b.Completed)
                                                     }).ToList();

            return Ok(todoListVM);
        }

        // GET api/<TodoListController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var todoList = await this.db.TodoLists.Include(a => a.Items).SingleOrDefaultAsync(a => a.Id == id);
            if (todoList == null)
                return NotFound();

            var todoListVM = new TodoListVM()
                             {
                                     Id = todoList.Id,
                                     Name = todoList.Name,
                                     Items = todoList.Items.Select(a => new TodoItemVM()
                                                                        {
                                                                                Name = a.Name,
                                                                                Id = a.Id,
                                                                                CreateDate = a.CreateDate
                                                                        }).ToList()
                             };

            return Ok(todoListVM);
        }

        // POST api/<TodoListController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string name)
        {
            var todoList = new TodoList()
                           {
                                   Name = name
                           };

            this.db.Add(todoList);
            await this.db.SaveChangesAsync();

            return Ok();
        }

        // PUT api/<TodoListController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string name)
        {
            var updateTodoList = await this.db.TodoLists.SingleOrDefaultAsync(a => a.Id == id);
            if (updateTodoList == null)
                return NotFound();

            updateTodoList.Name = name;
            this.db.Update(updateTodoList);
            await this.db.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/<TodoListController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todoList = await this.db.TodoLists.Include(a => a.Items).SingleOrDefaultAsync(a => a.Id == id);
            if (todoList == null)
                return NotFound();

            this.db.Remove(todoList.Items);
            this.db.Remove(todoList);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}