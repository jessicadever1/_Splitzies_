import React, { useContext } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import "./splitz.css";

export const SplitzDelete = () => {

    const { deleteSplitz } = useContext(SplitzContext)
    const splitzId = parseInt(useParams().id);
    const history = useHistory();
    console.log("splitzId", splitzId)

    const handleDeleteClick = () => {
        deleteSplitz(splitzId)
            .then(() => {
                history.push(`/mySplitz`)
            });
    }

    return (
        <>
            <div className="bkgwhite padTop">
                <h3 className="purple center">Are you sure you want to delete this splitz?</h3>
                <div className="flexRow">
                    <Button className="b" onClick={handleDeleteClick}>Yes, Final Answer</Button>
                    <Button className="b">
                        <Link className="b" to="/mySplitz">Nevermind, my bad</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
export default SplitzDelete;