import React, { useContext, useState } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'
import { date } from "check-types";
import ExpenseCard from "../Expense/ExpenseCard";


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
            splitzName: splitz.splitzName,
            date: splitz.date,
            splitzDetails: splitz.splitzDetails,
            splitzPic: splitz.splitzPic

        })
            .then(() => history.push(`/mySplitz`))
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

    return (<>
        <Form className="padding seeBot">
            <h1>Let's Add A Splitz!</h1>
            <Input
                id="splitzName"
                className="margBot"
                type="text"
                placeholder="Name Your Splitz"
                onChange={handleInputChange}>
            </Input>
            <Input
                id="date"
                className="margBot"
                type="date"
                onChange={handleInputChange}>
            </Input>
            <Input
                id="splitzPic"
                className="margBot"
                type="text"
                placeholder="Image URL"
                onChange={handleInputChange}>
            </Input>
            <Input
                id="splitzDetails"
                type="textarea"
                className="textarea margBot"
                placeholder={`Dear Future You,\
                \ You may not remember what this splitz was all about. So I’ve written a few notes about it to jog your memory.\
                Love,\
                \ Current You`}
                onChange={handleInputChange}>
            </Input>
            <Input
                id="searchForUser"
                className="margBot"
                type="search"
                placeholder="Who is Spitzing with you?"
            >
            </Input>

            <div>THIS IS WHERE EXPENSE LIST WILL BE IMPORTED</div>

            <div className="center">
                <Button id="btn" className="margBot" onClick={handleClickSaveSplitz}>Savezies</Button>
            </div>
        </Form>
    </>)
};

export default SplitzAdd;