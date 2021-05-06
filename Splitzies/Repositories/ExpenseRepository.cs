using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Splitzies.Models;
using Splitzies.Utils;

namespace Splitzies.Repositories
{
    public class ExpenseRepository : BaseRepository, IExpenseRepository
    {
        public ExpenseRepository(IConfiguration configuration) : base(configuration) { }

        public List<Expense> GetAllExpensesBySplitzId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                            e.Id, 
                                            e.SplitzId, 
                                            e.ExpenseName, 
                                            e.CategoryId, 
                                            e.Amount, 
                                            e.UserWhoPaidId,
                                            e.DeletedDate,

                                            s.Id as SplitzId,                                    
                                               
                                            up.Id AS userProfileId
                                        FROM Expense e
                                        JOIN Splitz s ON e.SplitzId = s.Id
                                        JOIN UserProfile up ON e.UserWhoPaidId = up.Id
                                        WHERE e.SplitzId = @id
                                        AND e.DeletedDate IS NULL
                                        ORDER BY e.Amount DESC
                                        ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var expenses = new List<Expense>();
                    while (reader.Read())
                    {
                        expenses.Add(new Expense()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SplitzId = DbUtils.GetInt(reader, "SplitzId"),
                            UserWhoPaidId = DbUtils.GetInt(reader, "UserWhoPaidId"),
                            ExpenseName = DbUtils.GetString(reader, "ExpenseName"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Amount = DbUtils.GetInt(reader, "Amount"),
                            DeletedDate = DbUtils.IsDbNull(reader, "DeletedDate") ? null : DbUtils.GetDateTime(reader, "DeletedDate"),
                            
                        });
                    }
                    reader.Close();
                    return expenses;
                }

            }
        }
    }
}
