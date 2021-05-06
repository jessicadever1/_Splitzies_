using System.Collections.Generic;
using Splitzies.Models;

namespace Splitzies.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
    }
}