import React, { useContext } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import "./splitz.css";

export const SplitzDelete = () => {

    const { deleteSplitz } = useContext(SplitzContext)
    const splitzId = parseInt(useParams().id);
    const history = useHistory();

    /*---------Does a soft delete from the database, and then sends the user back to their list of splitz ----*/

    const handleDeleteClick = () => {
        deleteSplitz(splitzId)
            .then(() => {
                history.push(`/mySplitz`)
            });
    }

    /*----- Confirms for the user that they do want to delete the splitz, before soft delete ------*/

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