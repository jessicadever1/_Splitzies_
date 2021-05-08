import React, { useContext, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { ExpenseContext } from '../providers/ExpenseProvider';
import { ExpenseCard } from "./ExpenseCard";
import './expense.css';
import { Button } from 'reactstrap';

export const ExpenseList = () => {
    const { expenses, GetAllExpensesBySplitzId } = useContext(ExpenseContext);
    const { id } = useParams();
    const splitzId = parseInt(id);
    const history = useHistory();

    useEffect(() => {
        GetAllExpensesBySplitzId(splitzId);
    }, []);

    expenses.map((expense) => {

        return (

            console.log(expense.amount)

        )
    })

    return (
        <>
            <div className="p bkgwhite">
                <h2 className="center purple margBot">How are these expenses looking?</h2>
                <div className="container mw">
                    <div className="row justify-content-center margBot">
                        <div className="cards=column width ">
                            {expenses.map((expense) => {
                                return <ExpenseCard key={expense.id} expense={expense} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="flexRow">
                    <Button className="eb" onClick={() => history.push(`/splitzDetails/${splitzId}`)}>Back to My Splitz </Button>
                    <Button className="eb"><Link className="white" to={`/addExpense/${splitzId}`}>Add Another Expense</Link></Button>
                </div>
            </div>
        </>
    );
};

export default ExpenseList;