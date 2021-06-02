import react, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import { SplitzContext } from "../providers/SplitzProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import dateFormat from 'dateformat';
import "./balance.css"

export const Balance = () => {

    /*---------------------- Used to access data from Splitz & Expenses -------------------------- */

    const { splitzies, getMySplitzies } = useContext(SplitzContext)
    const { expenses, getAllExpenses } = useContext(ExpenseContext)

    /*---------------------- Used to match the current user to the splitz user -------------------------- */

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    /*---------------------- Accessing the Splitz, and then the expenses -------------------------- */

    useEffect(() => {
        getMySplitzies()
            .then(getAllExpenses)
    }, []);

    let justNumbers = []
    expenses.map((expense) => {
        justNumbers.push(expense.amount)
    })

    const sum = justNumbers.reduce(add, 0);

    /*---------------------- Used to add the expenses to determine balances owed -------------------------- */

    function add(accumulator, a) {
        return accumulator + a;
    }

    /*---------------------- Used to return the array of data once -------------------------- */

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
                                                <div className="left font8">{dateFormat(splitz.date, "mmmm dS, yyyy")}</div>
                                                <div className="copyPaste">
                                                    ${array.map((x) => {
                                                    const usersOnSplitz = splitz.userProfiles
                                                    const user = usersOnSplitz.find(u => u.id === currentUser.id)
                                                    const filteredBySplitz = expenses.filter(e => e.splitzId === splitz.id && e.userWhoPaidId !== 0)
                                                    const amtsOwed = filteredBySplitz.map(a => a.amount)
                                                    const sumOfamtsOwed = amtsOwed.reduce(add, 0)
                                                    let filter = usersOnSplitz.filter(val => val.id)
                                                    let numOfSplitzers = filter.length;
                                                    const portionofSumOwed = parseFloat(sumOfamtsOwed / numOfSplitzers).toFixed(2)
                                                    const expensesPaid = expenses.filter(e => e.userWhoPaidId === user.id && e.splitzId === splitz.id)
                                                    const amtsPaid = expensesPaid.map(a => a.amount)
                                                    const sumOfamtsPaid = amtsPaid.reduce(add, 0)
                                                    const total = parseFloat(portionofSumOwed - sumOfamtsPaid).toFixed(2)
                                                    if (total < 0) {
                                                        return 0.00
                                                    } else if (total >= 0) { return total }

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


