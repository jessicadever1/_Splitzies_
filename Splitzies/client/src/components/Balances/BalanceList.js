import React, { useEffect, useContext, useState } from "react";
import Balance from "./Balance"
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { ExpenseContext } from "../providers/ExpenseProvider";
import { useParams, Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./balance.css"

export const BalanceList = () => {

    const { splitzies, getMySplitzies } = useContext(SplitzContext);

    useEffect(() => {
        getMySplitzies()
    })

    return (
        <>
            <div className="container padBot bc">
                <h2 className="purple center pad">Know What You Owe!</h2>
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {splitzies.map((splitz) => {
                            return <Balance key={splitz.id} splitz={splitz} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
};

export default BalanceList;