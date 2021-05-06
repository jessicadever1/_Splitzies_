import React, { useContext, useEffect, useState } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import "./splitz.css"

export const CategoryEditForm = () => {

    const { getSplitzById, editSplitz } = useContext(SplitzContext)
    const history = useHistory();
    const { splitzId } = useParams()
    const sId = parseInt(splitzId)

    const [splitz, setSplitz] = useState({
        "splitzName": "",
        "deletedDate": NULL,
        "id": sId
    })

    useEffect(() => {

        getSplitzById(sId)
            .then(splitz => {
                setSplitz(splitz)
            })
    }, [])

    const handleClickSaveSplitz = () => {
        if (sId) {
            editSplitz(
                {
                    splitzName: splitz.splitzName,
                    deletedDate: NULL,
                    id: sId
                }
            ).then(() => history.push(`/mySplitz`))
        }
    }

    const handleInputChange = (event) => {

        const newSplitz = { ...splitz }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newSplitz[event.target.id] = selectedVal
        setSplitz(newSplitz)
    }

    return (
        <Form className="addCatDiv">
            <Label htmlFor="catInput">Ready to Help You Make Changes!</Label>
            <Input id="splitzName"
                placeholder={splitz.splitzName}
                type="text"
                value=""
                onChange={handleInputChange}></Input>
            <Button className="b" onClick={handleClickSaveSplitz}>Save</Button>
            <Button className=""><Link className="b" to="/mySplitz" >My Bad, Nevermind</Link></Button>
        </Form>

    )
}

export default CategoryEditForm;