import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../providers/ExpenseProvider"
import { CategoryContext } from "../providers/CategoryProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import "./expense.css"

export const ExpenseEditForm = () => {

    const { getExpenseById, editExpense } = useContext(ExpenseContext)
    const { categories, getAllCategories } = useContext(CategoryContext)
    const history = useHistory();
    const { expenseId } = useParams()
    const expId = parseInt(expenseId)

    const [expense, setExpense] = useState({
        "expenseName": "",
        "categoryId": 0,
        "userWhoPaidId": 0,
        "amount": 0,
        "isDeleted": false,
        "id": expId
    })

    useEffect(() => {

        getExpenseById(expId)
            .then(expense => {
                setExpense(expense)
            })
    }, [])

    const handleClickSaveExpense = () => {
        if (expId) {
            editExpense(
                {
                    expenseName: expense.expenseName,
                    categoryId: expense.categoryId,
                    userWhoPaidId: expense.userWhoPaidId,
                    amount: expense.amount,
                    isDeleted: false,
                    id: expId
                }
            ).then(() => history.push(`/mySplitz`))
        }
    }

    const handleInputChange = (event) => {

        const newExpense = { ...expense }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newExpense[event.target.id] = selectedVal
        setExpense(newExpense)
    }

    useEffect(() => {
        getAllCategories()
    }, []);

    return (
        <Form className="padding seeBot bkgwhite">
            <h2 className="purple center">Oops! Need to make a change? We got you!</h2>
            <Input
                id="expenseName"
                placeholder="Expense Name"
                className="margBot"
                type="text"
                onChange={handleInputChange}>
            </Input>
            <div className="flexRow jc">
                <div>$</div>
                <div>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Dollar Amount"
                        className="margBot"
                        onChange={handleInputChange}>
                    </Input>
                </div>
            </div>
            <Input
                type="select"
                className="margBot"
                value={expense.categoryId}
                name="categoryId"
                id="categoryId"
                onChange={handleInputChange}>
                <option value="0">Select a Category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.categoryName}
                    </option>
                ))}
            </Input>
            <Input
                id="userWhoPaidId"
                type="select"
                value={expense.userWhoPaidId}
                name="userWhoPaidId"
                className="margBot"
                onChange={handleInputChange}>
                <option value="0">Who Paid For Expense?</option>

            </Input>

            <div className="flexRow">
                <Button
                    id="btn"
                    className="margBot"
                    onClick={handleClickSaveExpense}>
                    Save Expense
                </Button>
                <Button id="btn" className="margBot">Save My Updates</Button>
            </div>
            <Button id="btn"><Link className="white" to={`/expense/${expenseId}`}>Back To Splitz</Link></Button>
        </Form>
    )
}

export default ExpenseEditForm;

/*

{usersOnSplitz.map((up) => (
                    <option key={up.id} value={up.id}>
                        {up.displayName}
                    </option>
                ))}

*/