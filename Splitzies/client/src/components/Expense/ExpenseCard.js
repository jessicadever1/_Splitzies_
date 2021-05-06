import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import './expense.css'

export const ExpenseCard = ({ expense }) => {

    const { categories, getAllCategories } = useContext(CategoryContext)
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)

    useEffect(() => {
        getAllCategories()
            .then(getAllUserProfiles)
    }, []);

    let categorySelected = categories.filter((c => c.id === expense.categoryId))
    let catSeletected = categorySelected[0]

    let userWhoPaid = userProfiles.filter((up => up.id === expense.userWhoPaidId))
    let uWhoPaid = userWhoPaid[0]


    console.log("this is the user who paid", uWhoPaid)

    return catSeletected, uWhoPaid ? (
        <>
            <Card>
                <CardBody>
                    <div className="row">
                        <div>{expense.expenseName}</div>
                        <div>{catSeletected.categoryName}</div>
                        <div>${expense.amount}</div>
                        <div><img className="picIcon" src={uWhoPaid.profilePic} alt={uWhoPaid.firstName}></img></div>
                        <Link to={`/expenseDelete/${expense.id}`}><FontAwesomeIcon className="" icon={faTrashAlt} /></Link>
                        <Link to={`/expenseEdit/${expense.id}`}><FontAwesomeIcon className="" icon={faEdit} /></Link>
                    </div>
                </CardBody>
            </Card>
        </>
    ) : null;
};

export default ExpenseCard;