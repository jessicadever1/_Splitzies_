using System;

namespace Splitzies.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string ExpenseName { get; set; }
        public int CategoryId { get; set; }
        public int Amount { get; set; }
        public int UserWhoPaidId { get; set; }
        public int SplitzId { get; set; }
        public DateTime ? DeletedDate { get; set; }
        public Splitz splitz { get; set; }
    }
}
