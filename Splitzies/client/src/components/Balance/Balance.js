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
                                                <div className="copy/paste">
                                                    ${array.map((x) => {
                                                    const usersOnSplitz = splitz.userProfiles
                                                    const user = usersOnSplitz.find(u => u.id === currentUser.id)
                                                    const expensesOwed = expenses.filter(e => e.userWhoPaidId !== user.id)
                                                    const filteredExpensesOwed = expensesOwed.filter(e => e.userWhoPaidId !== 0)
                                                    const filteredBySplitz = expensesOwed.filter(e => e.splitzId === splitz.id && e.userWhoPaidId !== 0)
                                                    const amtsOwed = filteredBySplitz.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id && e.splitzId === splitz.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    console.log("this", amtsPaid)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const portionofSumPaid = parseFloat(sumOfamtsPaid / numOfSplitzers).toFixed(2)
                                                    const total = parseFloat(portionofSumOwed - portionofSumPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return 0
                                                    } else if (total >= 0) { return total }
                                                    console.log(total)
                                                    return total
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


