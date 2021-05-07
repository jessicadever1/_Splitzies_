import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Input } from 'reactstrap';
import { ExpenseContext } from '../providers/ExpenseProvider';
import { CategoryContext } from '../providers/CategoryProvider';
import { useHistory } from "react-router-dom";
import './expense.css';

export const ExpenseAdd = () => {
    const { addExpense } = useContext(ExpenseContext)
    const { categories, getAllCategories } = useContext(CategoryContext);
    const history = useHistory();

    useEffect(() => {
        getAllCategories();
    }, []);

    const [expense, setExpense] = useState({
        "expenseName": "",
        "categoryId": "",
        "userWhoPaidId": "",
        "amount": 0
    })

    const handleClickSaveExpense = (event) => {
        event.preventDefault()

        addExpense({
            expenseName: expense.expenseName,
            categoryId: expense.categoryId,
            userWhoPaidId: expense.userWhoPaidId,
            amount: expense.amount
        })
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

    return (
        <Form className="padding seeBot">
            <div>Let's add your expenses!</div>
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
                onChange={handleInputChange}>
                <option value="0">Select a Category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.categoryName}
                    </option>
                ))}
            </Input>
            <Input
                id="paidBy"
                type="select"
                placeholder="Paid By"
                className="margBot"
                onChange={handleInputChange}>
            </Input>

            <div className="flexRow">
                <Button
                    id="btn"
                    className="margBot"
                    onClick={handleClickSaveExpense}>
                    Save Expense
                </Button>
                <Button id="btn" className="margBot">Add Another Expense</Button>
            </div>
        </Form>
    )
};

export default ExpenseAdd;