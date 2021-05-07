import React from "react";
import './userProfile.css'

export const UserProfile = ({ userProfile }) => {
    return (
        <>
            <img className="a" src={userProfile.profilePic} alt={userProfile.firstName}></img>
        </>
    )
};

export default UserProfile;