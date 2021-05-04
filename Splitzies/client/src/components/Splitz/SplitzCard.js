import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./splitz.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons'

export const Splitz = ({ splitz }) => {
    console.log(splitz.userProfiles)

    let usersOnSplitz = splitz.userProfiles



    return (
        <Card className="m-4">
            <CardBody className="row">
                <div className="listPic">
                    <FontAwesomeIcon className="" icon={faRoute} />
                </div>

                <div>
                    <Link to="">{splitz.splitzName}</Link>
                    <p>{splitz.date}</p>
                    <div>
                        {usersOnSplitz.map((user) => {

                            return (
                                <>
                                    <img key={user.id} className="a" src={user.profilePic}></img>
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
