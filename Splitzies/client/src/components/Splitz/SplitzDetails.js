import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { useParams, Link } from "react-router-dom";
import "./splitz.css";
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const SplitzDetails = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { getSplitzById } = useContext(SplitzContext);
    const { expenses, GetAllExpensesBySplitzId } = useContext(ExpenseContext);
    const { id } = useParams();
    const splitzId = parseInt(id)
    const date = dateFormat(splitz.date, "mmmm dS, yyyy")

    useEffect(() => {
        getSplitzById(splitzId).then(setSplitz)
    }, []);

    useEffect(() => {
        GetAllExpensesBySplitzId(splitzId);
    }, []);

    let usersOnSplitz = splitz.userProfiles

    let justNumbers = []
    expenses.map((expense) => {
        justNumbers.push(expense.amount)
    })

    const sum = justNumbers.reduce(add, 0);

    function add(accumulator, a) {
        return accumulator + a;
    }

    let array = [1]

    let userWhoPaidId = expenses.map((expense) => {
        return expense.userWhoPaidId
    });
    //console.log("here is the userId who paid for the first expense", userWhoPaidId[0])

    let expenseAmt = expenses.map((expense) => {
        return expense.amount
    })

    const expensesSum = expenseAmt.reduce(add, 0)
    //console.log("idk", expensesSum)

    //console.log("this is the first expenseAmt", expenseAmt[0])

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    return usersOnSplitz ? (
        <div className="">
            <Card className="m-4 bkgwhite">
                <CardBody>
                    <div className="flexRow">
                        <CardImg className="detPicSize" top src={splitz.splitzPic} alt={splitz.splitzName} />

                        <div className="flexColumn">
                            <div id="se" className="flexRow">
                                <h1 className="text-left px-2 font18">{splitz.splitzName}</h1>
                                <div className="flexRow">
                                    <Link to={`/splitzDelete/${splitz.id}`}><FontAwesomeIcon className="trash" icon={faTrashAlt} /></Link>
                                    <Link to={`/splitzEdit/${splitz.id}`}><FontAwesomeIcon className="edit" icon={faEdit} /></Link>
                                </div>
                            </div>
                            <h2 className="text-left px-2 font14">{date}</h2>
                            <div className="flexRow">
                                <div>
                                    {usersOnSplitz.map((user) => {
                                        return (
                                            <>
                                                <img className="a" key={user.id} src={user.profilePic}></img>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="sb" className="flexRow">
                        <Button><Link className="b" to={`/expense/${splitzId}`}>See All Expenses</Link></Button>
                        <Button><Link className="b" to={`/addExpense/${splitzId}`}>Add Expense</Link></Button>
                    </div>

                    <div className="flexRow">
                        <div className="flexColumn center">
                            <h6 className="font10 purple">Your Portion Total</h6>
                            <p>${array.map(() => {
                                let filter = usersOnSplitz.filter(val => val.id)
                                let numOfSplitzers = filter.length;

                                const portion = parseFloat(sum / numOfSplitzers).toFixed(2)
                                return (
                                    portion
                                )
                            })}</p>
                        </div>
                        <div className="flexColumn center">
                            <h6 className="font10 purple">Your Total Owed</h6>
                            <p>${array.map((x) => {
                                const user = usersOnSplitz.find(u => u.id === currentUser.id)
                                const expensesOwed = expenses.filter(e => e.userWhoPaidId !== user.id)
                                const amtsOwed = expensesOwed.map(a => a.amount)
                                const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                let filter = usersOnSplitz.filter(val => val.id)
                                let numOfSplitzers = filter.length;
                                const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                const amtsPaid = expensesPaid.map(a => a.amount)
                                const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                if (total < 0) {
                                    return 0
                                } else if (total >= 0) { return total }
                                console.log(total)
                                return total
                            })}</p>
                        </div>
                    </div>

                    <h6 className="note">***Note: a negative number indicates that the person on the right, owes the person on the left said amount. We know it's not ideal. Thanks for your patience!***</h6>

                    <div className="flexColumn">

                        {array.map((user) => {

                            let filter = usersOnSplitz.filter(val => val.id)
                            let numOfSplitzers = filter.length;

                            if (numOfSplitzers === 1) {
                                return (
                                    <div className="center">
                                        <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                        <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                        <small>$0</small>
                                        <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                        <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                    </div>
                                )
                            } else if (numOfSplitzers === 2) {
                                return (
                                    <div className="center">
                                        <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                        <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                        <small>{array.map((x) => {
                                            const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[0].id)
                                            if (user.id === splitz.userProfiles[0].id) {
                                                const expensesOwed = expenses.filter(e => e.userWhoPaidId !== user.id)
                                                const amtsOwed = expensesOwed.map(a => a.amount)
                                                const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                let filter = usersOnSplitz.filter(val => val.id)
                                                let numOfSplitzers = filter.length;
                                                const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                const amtsPaid = expensesPaid.map(a => a.amount)
                                                const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                if (total < 0) {
                                                    return ("-$" + total * -1)
                                                } else if (total >= 0) {
                                                    return ("$" + total)
                                                }
                                                console.log(total)

                                            }
                                        })}</small>
                                        <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                        <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                    </div>
                                )
                            } else if (numOfSplitzers === 3) {
                                return (
                                    <>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[0].id)
                                                if (user.id === splitz.userProfiles[0].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[1].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                    //console.log(total)

                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[0].id)
                                                if (user.id === splitz.userProfiles[0].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[2].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                    //console.log(total)

                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[1].id)
                                                if (user.id === splitz.userProfiles[1].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[2].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                    //console.log(total)

                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                        </div>
                                    </>
                                )
                            } else if (numOfSplitzers === 4) {
                                return (
                                    <>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[0].id)
                                                if (user.id === splitz.userProfiles[0].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[1].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[0].id)
                                                if (user.id === splitz.userProfiles[0].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[2].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[0].id)
                                                if (user.id === splitz.userProfiles[0].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[3].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[3].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[1].id)
                                                if (user.id === splitz.userProfiles[1].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[2].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[1].id)
                                                if (user.id === splitz.userProfiles[1].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[3].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return ("-$" + total * -1)
                                                    } else if (total >= 0) {
                                                        return ("$" + total)
                                                    }
                                                }
                                            })}</small>
                                            <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                            <img className="balImg" src={splitz.userProfiles[3].profilePic} alt="profile pic"></img>
                                        </div>
                                        <div className="center">
                                            <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>

                                            <small>{array.map((x) => {
                                                const user = usersOnSplitz.find(u => u.id === splitz.userProfiles[2].id)
                                                if (user.id === splitz.userProfiles[2].id) {
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId === splitz.userProfiles[3].id)
                                                    const amtsOwed = expensesOwed.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return (
                                                            <>
                                                                <object><FontAwesomeIcon className="" icon={faArrowLeft} /></object>
                                                                {"$" + total * -1}
                                                                <object><FontAwesomeIcon className="" icon={faArrowLeft} /></object>
                                                            </>)
                                                    } else if (total >= 0) {
                                                        return (
                                                            <>
                                                                <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                                                {"$" + total}
                                                                <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                                            </>)
                                                    }
                                                }
                                            })}</small>

                                            <img className="balImg" src={splitz.userProfiles[3].profilePic} alt="profile pic"></img>
                                        </div>
                                    </>
                                )
                            }
                        }
                        )}



                    </div>

                </CardBody>
            </Card>
        </div>
    ) : null;
};

export default SplitzDetails;


/*
Notes:


let usersWhoOwe = []
                                let newObject = {}
                                let taco = usersOnSplitz.map((user) => {
                                    //console.log("do we have the id of userWhoPaid?", userWhoPaidId[0])
                                    if (user.id !== userWhoPaidId[0]) {
                                        //console.log("this is a userId of someone who owes", user.id)
                                        newObject.userIdWhoOwes = user.id
                                        //usersWhoOwe.push(newObject)
                                        //console.log("do we ahve the amt of the expense", expenseAmt[0])
                                        let filter = usersOnSplitz.filter(val => val.id)
                                        let numOfSplitzers = filter.length;
                                        //console.log("do we have the number of splitzers?", numOfSplitzers)
                                        //console.log("expenses:", expenses)
                                        let amtOwed = array.map((expense) => {
                                            let amtOwed = expense.amount / numOfSplitzers
                                            return amtOwed
                                        })

                                        newObject.amtOwed = amtOwed
                                        usersWhoOwe.push(newObject)
                                        console.log("arrayOfObjects: ", usersWhoOwe)
*/