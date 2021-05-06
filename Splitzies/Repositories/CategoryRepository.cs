using System.Collections.Generic;
using Splitzies.Utils;
using Splitzies.Models;
using Microsoft.Extensions.Configuration;

namespace Splitzies.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }



        public List<CategoryRepository> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT c.Id, c.Name
                                        FROM Category c
                                        WHERE c.isDeleted = 0
                                        ORDER BY c.Name ASC;";

                    var reader = cmd.ExecuteReader();
                    var categories = new List<CategoryRepository>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

    }
}
