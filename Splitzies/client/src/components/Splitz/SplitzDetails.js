import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { useParams, Link } from "react-router-dom";
import "./splitz.css";
import dateFormat from 'dateformat';

export const SplitzDetails = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { getSplitzById } = useContext(SplitzContext);
    const { id } = useParams();
    const splitzId = parseInt(id)
    const date = dateFormat(splitz.date, "mmmm dS, yyyy")

    useEffect(() => {
        getSplitzById(splitzId).then(setSplitz)
    }, []);

    return (
        <div>
            <Card className="m-4">
                <CardBody>
                    <div className="flexRow">
                        <CardImg className="picSize" top src={splitz.splitzPic} alt={splitz.splitzName} />

                        <div className="flexColumn">
                            <h1 className="text-left px-2 font18">{splitz.splitzName}</h1>
                            <h2 className="text-left px-2 font14">{date}</h2>
                        </div>
                    </div>
                    <div className="flexRow">
                        <Button><Link className="b" to={`/expense`}>See All Expenses</Link></Button>
                        <Button><Link className="b" to={`/expense/create/${splitz.id}`}>Add Expense</Link></Button>
                    </div>
                    <div className="flexRow">
                        <div className="flexColumn center">
                            <h6 className="font10">Your Portion Total</h6>
                            <p>$300.00</p>
                        </div>
                        <div className="flexColumn center">
                            <h6 className="font10">Your Total Owed</h6>
                            <p>$83.33</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default SplitzDetails;