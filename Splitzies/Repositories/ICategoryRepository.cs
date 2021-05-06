using System.Collections.Generic;

namespace Splitzies.Repositories
{
    public interface ICategoryRepository
    {
        List<CategoryRepository> GetAllCategories();
    }
}