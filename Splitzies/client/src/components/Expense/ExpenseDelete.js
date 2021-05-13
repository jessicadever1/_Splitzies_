import React, { useContext, useEffect } from "react";
import { ExpenseContext } from "../providers/ExpenseProvider"
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import "./expense.css";

export const ExpenseDelete = () => {

    const { expenses, deleteExpense, getAllExpenses } = useContext(ExpenseContext)
    const expenseId = parseInt(useParams().id);
    const history = useHistory();

    useEffect(() => {
        getAllExpenses()
    }, [])


    const splitzId = expenses.find(e => e.id === expenseId)?.splitzId

    console.log("this", splitzId)

    const handleDeleteClick = () => {
        deleteExpense(expenseId)
            .then(() => {
                history.push(`/expense/${splitzId}`)
            });
    }

    return (
        <>
            <div className="bkgwhite padTop">
                <h3 className="purple center">Are you sure you want to delete this expense?</h3>
                <div className="flexRow">
                    <Button className="b" onClick={handleDeleteClick}>Yes, Final Answer</Button>
                    <Button className="b">
                        <Link className="b" to={`/expense/${splitzId}`}>Nevermind, my bad</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
export default ExpenseDelete;