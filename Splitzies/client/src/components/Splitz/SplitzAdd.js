import React, { useContext, useState } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'

export const SplitzAdd = () => {

    const { addSplitz } = useContext(SplitzContext)
    const history = useHistory();

    const [splitz, setSplitz] = useState({
        "splitzName": "",
        "date": "",
        "splitzDetails": "",
        "splitzPic": ""
    })

    const handleClickSaveSplitz = (event) => {
        event.preventDefault()

        addSplitz({
            splitzName: splitzName
        })
            .then(() => history.push(`/mySplitz`))
    }

    return (
        <Form className="addSplitzDiv" onSubmit={handleClickSaveSplitz}>
            <Label for="splitzInput">New Category Name</Label>
            <Input id="catInput"
                placeholder="Enter Category Name"
                type="text"
                onChange={e => setCategory(e.target.value)}></Input>
            <Button className="a">Save</Button>
        </Form>

    )

}

export default CategoryForm;