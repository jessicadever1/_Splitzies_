using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Splitzies.Models
{
    public class Owed
    {
        public int Id { get; set; }
        public int ExpenseId { get; set; }
        public int UserThatOwesId { get; set; }
        public int Amount { get; set; }
        public bool Paid { get; set; }
    }
}
