import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap"
import dateFormat from 'dateformat';
import { Link } from "react-router-dom";
import { SplitzContext } from "../providers/SplitzProvider"

export const Balance = ({ splitz }) => {
    const date = dateFormat(splitz.date, "mmmm dS, yyyy")
    const { splitzies, getMySplitzies } = useContext(SplitzContext);

    useEffect(() => {
        getMySplitzies()
    }, [])

    return (
        <>
            <Card className="m-4">
                <CardBody>
                    <Link className="wrapText" to={`/splitzDetails/${splitz.id}`}>{splitz.splitzName}</Link>
                    <div>{date}</div>
                    <div className="flexRow">
                        <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                        <img className="balImg" src={splitz.userProfiles[1].profilePic} alt="profile pic"></img>

                    </div>
                </CardBody>
            </Card>
        </>
    )
};

export default Balance;