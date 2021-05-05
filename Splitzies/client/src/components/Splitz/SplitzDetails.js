import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { useParams, Link } from "react-router-dom";
import "./splitz.css";

export const SplitzDetails = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { getSplitzById } = useContext(SplitzContext);
    const { id } = useParams();
    const splitzId = parseInt(id)

    useEffect(() => {
        getSplitzById(splitzId)
    }, []);


    return (
        <div>
            <Card className="m-4">
                <CardBody>
                    <div className="flexRow">
                        <CardImg className="picSize" top src={splitz.splitzPic} alt={splitz.splitzName} />

                        <div className="flexColumn">
                            <h1 className="text-left px-2">{splitz.splitzName}</h1>
                            <h2>{splitz.date}</h2>
                            <div className="flexRow">
                                <Button><Link className="b" to={`/expense`}>See All Expenses</Link></Button>
                                <Button><Link className="b" to={`/expense/create/${splitz.id}`}>Add Expense</Link></Button>
                            </div>
                        </div>
                    </div>
                    <div className="flexRow">
                        <div className="flexColumn">
                            <h6>Your Portion Total</h6>
                            <p>$300.00</p>
                        </div>
                        <div className="flexColumn">
                            <h6>Your Total Owed</h6>
                            <p>$83.33</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default SplitzDetails;