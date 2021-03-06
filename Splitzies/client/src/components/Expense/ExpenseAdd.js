import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Input } from 'reactstrap';
import { ExpenseContext } from '../providers/ExpenseProvider';
import { CategoryContext } from '../providers/CategoryProvider';
import { SplitzContext } from '../providers/SplitzProvider';
import { useHistory, useParams, Link } from "react-router-dom";
import './expense.css';

export const ExpenseAdd = () => {

    /*---------------------- Access to expenses, categories, splitz and previously visited URLs -------------------------- */

    const { addExpense } = useContext(ExpenseContext)
    const { categories, getAllCategories } = useContext(CategoryContext);
    const splitzId = parseInt(useParams().id)
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { getSplitzById } = useContext(SplitzContext);
    const history = useHistory();

    const [expense, setExpense] = useState({
        expenseName: "",
        categoryId: 0,
        userWhoPaidId: 0,
        splitzId: 0,
        amount: 0
    })

    /*---------------------- when user fills out form, the name, id, userId, amt and splitzId are saved to database, then user is redirected to the list of expenses -------------------------- */

    const handleClickSaveExpense = (event) => {
        event.preventDefault()

        addExpense({
            expenseName: expense.expenseName,
            categoryId: parseInt(expense.categoryId),
            userWhoPaidId: expense.userWhoPaidId,
            amount: parseInt(expense.amount),
            splitzId: splitzId
        }).then(() => history.push(`/expense/${splitzId}`))
    }

    const handleExpenseInputChange = (event) => {

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

    useEffect(() => {
        getSplitzById(splitzId).then(setSplitz)
    }, []);

    let usersOnSplitz = splitz.userProfiles

    return usersOnSplitz ? (
        <Form className="padding seeBot bkgwhite">
            <h2 className="purple center">Let's add your expenses!</h2>
            <Input
                id="expenseName"
                placeholder="Expense Name"
                className="margBot"
                type="text"
                onChange={handleExpenseInputChange}>
            </Input>
            <div className="flexRow jc">
                <div>$</div>
                <div>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Dollar Amount"
                        className="margBot"
                        onChange={handleExpenseInputChange}>
                    </Input>
                </div>
            </div>
            <Input
                type="select"
                className="margBot"
                value={expense.categoryId}
                name="categoryId"
                id="categoryId"
                onChange={handleExpenseInputChange}>
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
                onChange={handleExpenseInputChange}>
                <option value="0">Who Paid For Expense?</option>
                {usersOnSplitz.map((up) => (
                    <option key={up.id} value={up.id}>
                        {up.displayName}
                    </option>
                ))}
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
            <Button id="btn"><Link className="white" to={`/splitzDetails/${splitzId}`}>Back To Splitz</Link></Button>
        </Form>
    ) : null;
};

export default ExpenseAdd;