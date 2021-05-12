import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap"
import dateFormat from 'dateformat';
import { Link } from "react-router-dom";
import { SplitzContext } from "../providers/SplitzProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const Balance = ({ splitz }) => {
    const date = dateFormat(splitz.date, "mmmm dS, yyyy")
    const { splitzies, getMySplitzies } = useContext(SplitzContext);

    useEffect(() => {
        getMySplitzies()
    }, [])

    let usersOnSplitz = splitz.userProfiles
    let array = [1]

    return (
        <>
            <Card className="m-4">
                <CardBody>
                    <Link className="wrapText" to={`/splitzDetails/${splitz.id}`}>{splitz.splitzName}</Link>
                    <div>{date}</div>
                    <div className="flexRowLeft padLeft">
                        {array.map((user) => {

                            let filter = usersOnSplitz.filter(val => val.id)
                            let numOfSplitzers = filter.length;

                            if (numOfSplitzers === 1) {
                                return (
                                    <div className="center">
                                        <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                        <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                        <small>$0</small>
                                        <object><FontAwesomeIcon className="" icon={faArrowRight} /></object>
                                        <img className="balImg" src={splitz.userProfiles[0].profilePic} alt="profile pic"></img>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </CardBody>
            </Card>
        </>
    )
};

export default Balance;