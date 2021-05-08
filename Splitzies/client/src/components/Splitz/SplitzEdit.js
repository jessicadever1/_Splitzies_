import React, { useContext, useEffect, useState } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import "./splitz.css"

export const SplitzEdit = () => {

    const { getSplitzById, editSplitz } = useContext(SplitzContext)
    const history = useHistory();
    const { splitzId } = useParams()
    const sId = parseInt(splitzId)


    const [splitz, setSplitz] = useState({
        "id": sId,
        "splitzName": "",
        "date": "",
        "splitzDetails": "",
        "splitzPic": ""
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
                    date: splitz.date,
                    splitzDetails: splitz.splitzDetails,
                    splitzPic: splitz.splitzPic,
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
        <div className="bkgwhiteRad">
            <Form className="padding seeBot  purple center">
                <h1>Ready to Help You Make Changes!</h1>
                <Input
                    id="splitzName"
                    className="margBot"
                    type="text"
                    defaultValue={splitz.splitzName}
                    onChange={handleInputChange}>
                </Input>
                <Input
                    id="date"
                    className="margBot"
                    type="date"
                    defaultValue={splitz.date}
                    onChange={handleInputChange}>
                </Input>
                <Input
                    id="splitzPic"
                    className="margBot"
                    type="text"
                    placeholder="Image URL"
                    defaultValue={splitz.splitzPic}
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
                    defaultValue={splitz.splitzDetails}
                    onChange={handleInputChange}>
                </Input>
                <Input
                    id="searchForUser"
                    className="margBot"
                    type="search"
                    placeholder="Who is Spitzing with you?"
                >
                </Input>
                <div>Now, let's add your expenses!</div>
                <Input
                    id="expenseName"
                    placeholder="Expense Name"
                    className="margBot"
                    type="text">
                </Input>
                <div className="flexRow jc">
                    <div>$</div>
                    <div>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Dollar Amount"
                            className="margBot">
                        </Input>
                    </div>
                </div>
                <Input
                    id="category"
                    type="select"
                    placeholder="Expense Category"
                    className="margBot">
                </Input>
                <Input
                    id="paidBy"
                    type="select"
                    placeholder="Paid By"
                    className="margBot">
                </Input>

                <div className="flexRow">
                    <Button id="btn" className="margBot">Save Expense</Button>
                    <Button id="btn" className="margBot">Add Another Expense</Button>
                </div>
                <div className="center">
                    <Button id="btn" className="margBot" onClick={handleClickSaveSplitz}>Savezies</Button>
                    <Button id="btn" className="margBot"><Link className="b" to="/mySplitz" >My Bad, Nevermind</Link></Button>
                </div>

            </Form>
        </div>
    )
}

export default SplitzEdit;