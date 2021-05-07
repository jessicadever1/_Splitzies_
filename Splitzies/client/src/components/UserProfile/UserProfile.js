import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap'
import './userProfile.css'

export const UserProfile = ({ userProfile }) => {
    return (
        <>
            <details >
                <summary className="white"><img className="a" src={userProfile.profilePic} alt={userProfile.firstName}></img></summary>
                <p className="flexRow">
                    <Link><FontAwesomeIcon className="" icon={faPlusCircle} /></Link>
                    <div>{userProfile.firstName}</div>
                </p>
            </details>
        </>
    )
};

export default UserProfile;