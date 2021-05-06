using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IExpenseRepository
    {
        List<Expense> GetAllExpensesBySplitzId(int id);
    }
}