import React, { useContext, useState } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'
import { date } from "check-types";

export const SplitzAdd = () => {

    // const { addSplitz } = useContext(SplitzContext)
    // const history = useHistory();

    // const [splitz, setSplitz] = useState({
    //     "splitzName": "",
    //     "date": "",
    //     "splitzDetails": "",
    //     "splitzPic": ""
    // })

    // const handleClickSaveSplitz = (event) => {
    //     event.preventDefault()

    //     addSplitz({
    //         splitzName: splitzName,
    //         splitzDetails: splitzDetails,
    //         splitzPic: splitzPic
    //     })
    //         .then(() => history.push(`/mySplitz`))
    // }

    return (<>
        <Form className="padding">
            <h1>Let's Add A Splitz!</h1>
            <Input
                id="splitzName"
                type="text"
                placeholder="Name of Your New Splitz">
            </Input>
            <Input
                id="date"
                type="date">
            </Input>
            <Input
                id="splitzPic"
                type="text"
                placeholder="Image URL">
            </Input>
            <Input
                id="splitzDetails"
                type="textarea"
                className="textarea"
                placeholder={`Dear Future You,\
                You may not remember what this splitz was all about. So I’ve written a few notes about it to jog your memory.\
                Love,\
                Current You`}>
            </Input>
        </Form>
    </>)
};

export default SplitzAdd;