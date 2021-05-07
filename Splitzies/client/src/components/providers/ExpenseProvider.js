import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ExpenseContext = React.createContext();

export const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const GetAllExpensesBySplitzId = (splitzId) => {
        return getToken().then((token) =>
            fetch(`/api/Expense/${splitzId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setExpenses)
        )
    };

    const addExpense = (expense) => {
        return getToken().then((token) =>
            fetch(`/api/Expense`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(expense),
            }))
    };

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                GetAllExpensesBySplitzId,
                setExpenses,
                addExpense
            }}
        >
            {props.children}
        </ExpenseContext.Provider >
    )
};

export default ExpenseProvider;