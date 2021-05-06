using System.Collections.Generic;
using Splitzies.Utils;
using Splitzies.Models;
using Microsoft.Extensions.Configuration;

namespace Splitzies.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }



        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        c.Id, 
                                        c.CategoryName
                                        FROM Category c
                                        ORDER BY c.Name ASC;";

                    var reader = cmd.ExecuteReader();
                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            CategoryName = DbUtils.GetString(reader, "CategoryName")
                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

    }
}
