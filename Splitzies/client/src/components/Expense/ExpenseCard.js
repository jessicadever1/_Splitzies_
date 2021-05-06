import React from "react";
import { Card, CardBody } from "reactstrap";
import './expense.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const ExpenseCard = ({ expense }) => {

    return (
        <>
            <Card>
                <CardBody>
                    <div className="row">
                        <div>{expense.expenseName}</div>
                        <div>CATEGORY IS GOING HERE. ONE MOMENT.</div>
                        <div>{expense.amount}</div>
                        <div>{expense.userWhoPaidId}</div>
                        <Link to={`/splitzDelete/${splitz.id}`}><FontAwesomeIcon className="" icon={faTrashAlt} /></Link>
                        <Link to={`/splitzEdit/${splitz.id}`}><FontAwesomeIcon className="" icon={faEdit} /></Link>
                    </div>
                </CardBody>
            </Card>
        </>
    )
};

export default ExpenseCard;