import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./splitz.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

export const Splitz = ({ splitz }) => {

    let usersOnSplitz = splitz.userProfiles
    const date = dateFormat(splitz.date, "mmmm dS, yyyy")

    return (
        <Card className="m-4">
            <CardBody className="row">
                <div className="listPic">
                    <FontAwesomeIcon className="" icon={faRoute} />
                </div>

                <div>
                    <Link to={`/splitzDetails/${splitz.id}`}>{splitz.splitzName}</Link>
                    <p>{date}</p>
                    <div>
                        {usersOnSplitz.map((user) => {
                            return (
                                <>
                                    <img className="a" key={user.id} src={user.profilePic}></img>
                                </>
                            )
                        })}
                    </div>
                </div>
                <FontAwesomeIcon icon={faCommentsDollar} />
            </CardBody>
        </Card>
    );
};

export default Splitz;
