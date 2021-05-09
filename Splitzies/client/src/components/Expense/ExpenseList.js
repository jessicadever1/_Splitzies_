import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { ExpenseContext } from '../providers/ExpenseProvider';
import { SplitzContext } from "../providers/SplitzProvider"
import { ExpenseCard } from "./ExpenseCard";
import './expense.css';
import { Button } from 'reactstrap';

export const ExpenseList = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { expenses, GetAllExpensesBySplitzId } = useContext(ExpenseContext);
    const { getSplitzById } = useContext(SplitzContext)
    const { id } = useParams();
    const splitzId = parseInt(id);
    const history = useHistory();

    useEffect(() => {
        GetAllExpensesBySplitzId(splitzId);
    }, []);

    useEffect(() => {
        getSplitzById(splitzId).then(setSplitz)
    }, []);

    let usersOnSplitz = splitz.userProfiles

    let justNumbers = []
    expenses.map((expense) => {
        justNumbers.push(expense.amount)
    })

    const sum = justNumbers.reduce(add, 0); // with initial value to avoid when the array is empty

    function add(accumulator, a) {
        return accumulator + a;
    }

    console.log("do we have the sum of the numbers?", sum)

    let kate = [1]

    return usersOnSplitz ? (
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
                    <div className="flexColumn center">
                        <h6 className="font10 purple">Total Cost of Splitz</h6>
                        <p>${sum}</p>
                    </div>
                    <div className="flexColumn center">
                        <h6 className="font10 purple">Your Portion of Splitz</h6>
                        <p>${kate.map(() => {
                            let filter = usersOnSplitz.filter(val => val.id)
                            let numOfSplitzers = filter.length;
                            console.log("do we have access to numofSplitzers and is it a num?", numOfSplitzers)

                            const portion = parseFloat(sum / numOfSplitzers).toFixed(2)
                            return (
                                portion
                            )
                        })}</p>
                    </div>
                </div>
                <div className="flexRow">
                    <Button className="eb" onClick={() => history.push(`/splitzDetails/${splitzId}`)}>Back to My Splitz </Button>
                    <Button className="eb"><Link className="white" to={`/addExpense/${splitzId}`}>Add Another Expense</Link></Button>
                </div>
            </div>
        </>
    ) : null;
};

export default ExpenseList;