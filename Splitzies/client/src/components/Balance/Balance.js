import react, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import "./balance.css"

export const Balance = () => {

    const { splitzies, getMySplitzies } = useContext(SplitzContext)
    const { expenses, getAllExpenses } = useContext(ExpenseContext)

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    const currentUserId = currentUser.id
    console.log("currentUser", currentUserId)

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
        console.log("results", results)
        results.filter(r => r.id === splitz.id)
        return splitz
    })
    console.log("matching", matchingSplitzIds)

    return (
        <>
            <section className="bkground center">
                <p className="purple stupid font20">Know What You Owe!</p>
                <div>

                </div>
            </section>
        </>
    )
}

export default Balance;