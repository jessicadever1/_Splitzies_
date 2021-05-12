import react, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import { SplitzContext } from "../providers/SplitzProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import dateFormat from 'dateformat';
import "./balance.css"

export const Balance = () => {

    const { splitzies, getMySplitzies } = useContext(SplitzContext)
    const { expenses, getAllExpenses } = useContext(ExpenseContext)

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    const currentUserId = currentUser.id

    useEffect(() => {
        getMySplitzies()
            .then(getAllExpenses)
    }, []);

    const mapInMap = () => {
        let arrayOfExpenses = []
        for (let expense of expenses) {
            arrayOfExpenses.push(expense.splitzId)
        }
        return arrayOfExpenses
    }

    let results = mapInMap()

    let matchingSplitzIds = splitzies.map((splitz) => {

        results.filter(r => r.id === splitz.id)
        return splitz
    })
    console.log("matching", matchingSplitzIds)

    function add(accumulator, a) {
        return accumulator + a;
    }

    let array = [1]

    return (
        <>
            <section className="bkground center">
                <p className="purple stupid font20">Know What You Owe!</p>
                <div>
                    {splitzies.map((splitz) => {
                        return (
                            <>
                                <Card className="margin">
                                    <CardBody>
                                        <div className="flexRowLeft">
                                            <img className="picSize" src={splitz.splitzPic} alt={splitz.splitzName}></img>
                                            <div className="margLeft1 flexColumn">
                                                <Link className="left" to={`/splitzDetails/${splitz.id}`}>{splitz.splitzName}</Link>
                                                <div className="left">{dateFormat(splitz.date, "mmmm dS, yyyy")}</div>
                                                <div>{array.map((x) => {
                                                    let usersOnThisSplitz = splitz.userProfiles;
                                                    let user = usersOnThisSplitz.find((u) => u.id === currentUserId)
                                                    let userPaidThese = expenses.filter((e) => e.userWhoPaidId === currentUserId)
                                                    let forThisSplitzUserPaid = userPaidThese.filter((e) => e.splitzId === splitz.id)
                                                    let amtArray = forThisSplitzUserPaid.map((a) => a.amount)
                                                    let logggedInUserPaid = amtArray.reduce(add, 0)
                                                    let expensesForThisSplitz1 = expenses.filter((e) => e.splitzId === splitz.id)
                                                    let expensesForThisSplitz = expensesForThisSplitz1.filter((e) => e.userWhoPaidId !== 0)
                                                    let expenseAmtArray = expensesForThisSplitz.map((a) => a.amount)
                                                    let sumOfExpenseAmts = expenseAmtArray.reduce(add, 0)
                                                    let numOfUsersOnThisSplitz = usersOnThisSplitz.length
                                                    let portionOwed = parseFloat(sumOfExpenseAmts / numOfUsersOnThisSplitz).toFixed(2)
                                                    let portionOwedMinusPortionPaid = portionOwed - logggedInUserPaid
                                                    console.log("this", logggedInUserPaid)

                                                    return ""
                                                })}</div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </>
                        )
                    }
                    )}
                </div>
            </section>
        </>
    )
}

export default Balance;


/*

const user = usersOnThisSplitz.find(u => u.id === currentUserId)
                                                    const expensesOwed = expenses.filter((e) => e.userWhoPaidId !== user.id)
                                                    const amtsOwed = expensesOwed.map((e) => e.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0);
                                                    let filter = usersOnThisSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionOfSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionOfSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return 0
                                                    } else if (total >= 0) { return total }
*/