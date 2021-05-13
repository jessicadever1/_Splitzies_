using Splitzies.Models;
using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface IExpenseRepository
    {
        void Add(Expense expense);
        void Delete(int id);
        List<Expense> GetAllExpenses();
        List<Expense> GetAllExpensesBySplitzId(int id);
        Expense GetById(int id);
    }
}