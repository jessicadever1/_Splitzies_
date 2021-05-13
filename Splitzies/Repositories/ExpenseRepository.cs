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




        public Expense GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        E.expenseName, 
                                        E.categoryId, 
                                        E.userWhoPaidId,
                                        E.amount,
                                        E.splitzId,

                                        S.Id AS SplitzId,
                                        S.splitzName
                                       FROM Expense E
                                            LEFT JOIN Splitz S ON E.splitzId = S.Id
                                       WHERE E.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Expense expense = null;
                    while (reader.Read())
                    {
                        expense = new Expense()
                        {
                            Id = id,
                            ExpenseName = DbUtils.GetString(reader, "expenseName"),
                            CategoryId = DbUtils.GetInt(reader, "categoryId"),
                            UserWhoPaidId = DbUtils.GetInt(reader, "UserWhoPaidId"),
                            Amount = DbUtils.GetInt(reader, "amount"),
                            SplitzId = DbUtils.GetInt(reader, "splitzId"), 
                            splitz = new Splitz()
                            {
                                Id = DbUtils.GetInt(reader, "splitzId"),
                                SplitzName = DbUtils.GetString(reader, "splitzName")
                            },
                        };
                    }
                    reader.Close();
                    return expense;
                }
            }
        }




        public void Add(Expense expense)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Expense 
                                            (ExpenseName,
                                             CategoryId,
                                             UserWhoPaidId,
                                             Amount,
                                             SplitzId)

                                        OUTPUT INSERTED.ID

                                        VALUES 
                                            (@ExpenseName, 
                                             @CategoryId, 
                                             @UserWhoPaidId, 
                                             @Amount, 
                                             @SplitzId)";

                    DbUtils.AddParameter(cmd, "@ExpenseName", expense.ExpenseName);
                    DbUtils.AddParameter(cmd, "@CategoryId", expense.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserWhoPaidId", expense.UserWhoPaidId);
                    DbUtils.AddParameter(cmd, "@Amount", expense.Amount);
                    DbUtils.AddParameter(cmd, "@SplitzId", expense.SplitzId);

                    expense.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public List<Expense> GetAllExpenses()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT e.Id as ExpenseId, 
                                                e.ExpenseName, 
                                                e.CategoryId, 
                                                e.Amount, 
                                                e.UserWhoPaidId, 
                                                e.SplitzId, 
                                                e.DeletedDate
                                              
                                         FROM Expense e
                                         WHERE e.DeletedDate IS NULL
                                         ORDER BY e.Amount";

                    var reader = cmd.ExecuteReader();
                    var expenses = new List<Expense>();
                    while (reader.Read())
                    {
                        expenses.Add(new Expense()
                        {
                            Id = DbUtils.GetInt(reader, "ExpenseId"),
                            ExpenseName = DbUtils.GetString(reader, "ExpenseName"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Amount = DbUtils.GetInt(reader, "Amount"),
                            UserWhoPaidId = DbUtils.GetInt(reader, "UserWhoPaidId"),
                            SplitzId = DbUtils.GetInt(reader, "SplitzId"),
                            DeletedDate = DbUtils.IsDbNull(reader, "DeletedDate") ? null : DbUtils.GetDateTime(reader, "DeletedDate"),
                        });
                    }
                    reader.Close();
                    return expenses;
                }
            }
        }



        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Expense
                                        SET DeletedDate = @deletedDate
                                        WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@deletedDate", DateTime.Now);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
