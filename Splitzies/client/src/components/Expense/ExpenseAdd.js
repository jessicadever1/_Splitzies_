import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Input } from 'reactstrap';
import { ExpenseContext } from '../providers/ExpenseProvider';
import { useHistory } from "react-router-dom";
import './expense.css';

export const ExpenseAdd = () => {
    const { addExpense } = useContext(ExpenseContext)
    const history = useHistory();

    const [expense, setExpense] = useState({
        "expenseName": "",
        "categoryId": "",
        "userWhoPaidId": "",
        "amount": 0
    })

    const handleClickSaveExpense = (event) => {
        event.preventDefault()

        addSplitz({
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
                id="category"
                type="select"
                placeholder="Expense Category"
                className="margBot"
                onChange={handleInputChange}>
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