namespace TestTaskTODO.Model
{
    #region << Using >>

    using System;

    #endregion

    public class TodoItemVM
    {
        #region Properties

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public bool CompletedTask { get; set; }

        #endregion

        #region Constructors

        public TodoItemVM()
        {
            CreateDate = DateTime.Now;
        }

        #endregion
    }
}