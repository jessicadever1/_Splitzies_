import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { useParams, Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const Balance = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { expenses } = useContext(ExpenseContext);

    function add(accumulator, a) {
        return accumulator + a;
    }

    let usersOnSplitz = splitz.userProfiles
    let array = [1]

    return (
        <>
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

                                <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                            </div>
                        )
                    } else if (numOfSplitzers === 3) {
                        return (
                            <>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>

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

                                    <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                </div>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>

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

                                    <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                </div>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>

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

                                    <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                </div>
                            </>
                        )
                    } else if (numOfSplitzers === 4) {
                        return (
                            <>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>

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

                                    <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>
                                </div>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>

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

                                    <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                </div>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>

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
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>

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

                                    <img className="balImg" src={splitz.userProfiles[2].profilePic} alt="profile pic"></img>
                                </div>
                                <div className="center">
                                    <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>

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
        </>
    )
};

export default Balance;