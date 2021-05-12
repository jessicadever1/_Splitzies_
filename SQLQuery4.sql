SELECT e.Id as ExpenseId, 
                                                e.expenseName, 
                                                e.CategoryId, 
                                                e.Amount, 
                                                e.UserWhoPaidId, 
                                                e.SplitzId, 
                                                e.DeletedDate
                                              
                                         FROM Expense e
                                         
                                         ORDER BY e.Amount