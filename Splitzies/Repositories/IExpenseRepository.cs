using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IExpenseRepository
    {
        void Add(Expense expense);
        List<Expense> GetAllExpensesBySplitzId(int id);
        Expense GetById(int id);
    }
}