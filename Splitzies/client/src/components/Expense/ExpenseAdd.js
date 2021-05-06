import React from "react";
import './expense.css';

export const ExpenseAdd = () => {
    return (
        <Form className="padding seeBot">
            <div>Now, let's add your expenses!</div>
            <Input
                id="expenseName"
                placeholder="Expense Name"
                className="margBot"
                type="text">
            </Input>
            <div className="flexRow jc">
                <div>$</div>
                <div>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Dollar Amount"
                        className="margBot">
                    </Input>
                </div>
            </div>
            <Input
                id="category"
                type="select"
                placeholder="Expense Category"
                className="margBot">
            </Input>
            <Input
                id="paidBy"
                type="select"
                placeholder="Paid By"
                className="margBot">
            </Input>

            <div className="flexRow">
                <Button id="btn" className="margBot">Save Expense</Button>
                <Button id="btn" className="margBot">Add Another Expense</Button>
            </div>
        </Form>
    )
};

export default ExpenseAdd