import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { useParams, Link } from "react-router-dom";
import "./splitz.css";

export const SplitzDetails = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { getSplitzById } = useContext(SplitzContext);
    const { id } = useParams();

    useEffect(() => {
        getSplitzById(id).then(setSplitz)
    }, []);


    return (
        <div>
            <Card className="m-4">
                <CardBody>
                    <div className="flexRow">
                        <CardImg top src={splitz.splitzPic} alt={splitz.splitzName} />

                        <div class="flexColumn">
                            <h1 className="text-left px-2">{splitz.splitzName}</h1>
                            <h2>{splitz.date}</h2>
                            <div class="flexRow">
                                <Button><Link className="a" to={`/expense`}>See All Expenses</Link></Button>
                                <Button><Link className="a" to={`/expense/create/${splitz.id}`}>Add Expense</Link></Button>
                            </div>
                        </div>
                    </div>
                    <div class="flexRow">
                        <div class="flexColumn">
                            <h6>Your Portion Total</h6>
                            <p>$300.00</p>
                        </div>
                        <div class="flexColumn">
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