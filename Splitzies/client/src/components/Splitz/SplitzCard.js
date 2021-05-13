import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import "./splitz.css";
import dateFormat from 'dateformat';

export const Splitz = ({ splitz }) => {

    let usersOnSplitz = splitz.userProfiles
    const date = dateFormat(splitz.date, "mmmm dS, yyyy")

    return splitz ? (
        <Card className="m-2" key={splitz.id}>
            <CardBody id="margForCard" className="row">
                <CardImg className="picSize" top src={splitz.splitzPic} alt={splitz.splitzName} />

                <div className="margL flexColumn">
                    <Link className="wrapText" to={`/splitzDetails/${splitz.id}`}>{splitz.splitzName}</Link>
                    <p>{date}</p>
                    <div className="overflow flexRowLeft">
                        {usersOnSplitz.map((user) => {
                            return (
                                <>
                                    <div key={user.id}>
                                        <img className="a" src={user.profilePic} alt={user.firstName}></img>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>

            </CardBody>
        </Card>
    ) : null;
};

export default Splitz;
