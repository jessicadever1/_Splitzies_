import React, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import './expense.css'
import lodging from "../images/Lodging.png"

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

    return catSeletected && uWhoPaid ? (
        <>
            <Card className="margBot sp">
                <CardBody>
                    <div className="row se">
                        <img className="iconSize" src={catSeletected.icon} alt="icon"></img>
                        <div className="widthName">{expense.expenseName}</div>
                        <div>${expense.amount}</div>
                        <div><img className="picIcon" src={uWhoPaid.profilePic} alt={uWhoPaid.firstName}></img></div>
                        <Link to={`/expenseDelete/${expense.id}`}><FontAwesomeIcon className="" icon={faTrashAlt} /></Link>

                    </div>
                </CardBody>
            </Card>
        </>
    ) : null;
};

export default ExpenseCard;