import React, { useContext, useEffect } from 'react';
import { ExpenseContext } from '../providers/ExpenseProvider';
import { ExpenseCard } from "./ExpenseCard";
import './expense.css';

export const ExpenseList = () => {
    const { expenses, GetAllExpensesBySplitzId } = useContext(ExpenseContext);
    const { id } = useParams();

    console.log("is this the splitzid in num format?", id)

    useEffect(() => {
        GetAllExpensesBySplitzId(id);
    }, []);

    console.log("these are my expenes", expenses)

    return (
        <>
            <h2>How are these expenses looking?</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        {expenses.map((expense) => {
                            return <ExpenseCard key={expense.id} expense={expense} />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};