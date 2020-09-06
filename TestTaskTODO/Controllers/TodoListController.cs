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

        #region Nested Classes

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
        
        [HttpGet ("{id}")]
        // GET api/<TodoListController>/5
        public async Task<IActionResult> Get(int id,  [FromQuery]string search, [FromQuery]bool undone)
        {
            var todoList = await this.db.TodoLists.Include(a => a.Items)
                                     .SingleOrDefaultAsync(a => a.Id == id);

            if (todoList == null)
                return NotFound();

            var todoItemVM = todoList.Items.Where(item => (string.IsNullOrWhiteSpace(search) ||
                                                           item.Name.ToLower()
                                                               .Contains(search
                                                                                 .ToLower())) && (!undone || !item.Completed))
                                     .Select(a => new TodoItemVM()
                                                  {
                                                          Id = a.Id,
                                                          Name = a.Name,
                                                          CompletedTask = a.Completed,
                                                          CreateDate = a.CreateDate
                                                  }).ToList();

            var todoListVM = new TodoListVM()
                             {
                                     Id = todoList.Id,
                                     Name = todoList.Name,
                                     Items = todoItemVM
                             };

            return Ok(todoListVM);
        }

        // POST api/<TodoListController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string name)
        {
            if (name == null)
                return NotFound();

            var todoList = new TodoList()
                           {
                                   Name = name
                           };

            this.db.Add(todoList);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}