namespace TestTaskTODO.Model
{
    #region << Using >>

    using Microsoft.EntityFrameworkCore;

    #endregion

    public class ApplicationContext : DbContext
    {
        #region Properties

        public DbSet<TodoList> TodoLists { get; set; }

        public DbSet<TodoItem> TodoItems { get; set; }

        #endregion

        #region Constructors

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        #endregion
    }
}