import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ExpenseContext = React.createContext();

export const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const GetAllExpensesBySplitzId = (splitzId) => {
        return getToken().then((token) =>
            fetch(`/api/Expense/getBySplitzId/${splitzId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setExpenses)
        )
    };

    const getExpenseById = (id) => {
        return getToken().then((token) =>
            fetch(`/api/Expense/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
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

    const getAllExpenses = () => {

        return getToken().then((token) =>
            fetch(`/api/Expense`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()))
            .then(setExpenses)
    };

    const deleteExpense = (id) => {
        return getToken().then((token) =>
            fetch(`/api/Expense/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        )
    };

    const editExpense = (expense) => {
        return getToken()
            .then((token) =>
                fetch(`/api/Expense/${expense.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(expense),
                })
            )
    };

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                getAllExpenses,
                GetAllExpensesBySplitzId,
                setExpenses,
                getExpenseById,
                addExpense,
                deleteExpense,
                editExpense
            }}
        >
            {props.children}
        </ExpenseContext.Provider >
    )
};

export default ExpenseProvider;