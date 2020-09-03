namespace TestTaskTODO.Model
{
    #region << Using >>

    using System.Collections.Generic;

    #endregion

    public class TodoListVM
    {
        #region Properties

        public int Id { get; set; }

        public string Name { get; set; }

        public List<TodoItemVM> Items { get; set; }

        public int CountAllItems { get; set; }

        public int CompletedItemsCount { get; set; }

        #endregion

        #region Constructors

        public TodoListVM()
        {
            Items = new List<TodoItemVM>();
        }

        #endregion
    }
}