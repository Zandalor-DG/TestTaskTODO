namespace TestTaskTODO.Model
{
    #region << Using >>

    using System;
    using System.Collections.Generic;

    #endregion

    public class TodoList
    {
        #region Properties

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public List<TodoItem> Items { get; set; }

        #endregion

        #region Constructors

        public TodoList()
        {
            Items = new List<TodoItem>();
        }

        #endregion
    }
}