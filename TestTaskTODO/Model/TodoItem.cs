namespace TestTaskTODO.Model
{
    #region << Using >>

    using System;

    #endregion

    public class TodoItem
    {
        #region Properties

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public bool Completed { get; set; }

        #endregion

        #region Constructors

        public TodoItem()
        {
            CreateDate = DateTime.Now;
        }

        #endregion
    }
}