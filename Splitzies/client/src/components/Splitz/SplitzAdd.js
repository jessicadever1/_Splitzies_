import React, { useContext, useState, useEffect } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory, Link } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ExpenseList } from "../Expense/ExpenseList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '../UserProfile/UserProfile';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './splitz.css';

export const SplitzAdd = () => {

    const { addSplitz } = useContext(SplitzContext)
    const history = useHistory();
    const {
        userProfiles,
        setUserProfiles,
        getAllUserProfiles,
        searchUsersByName,
        searchedName,
        setSearchedName,
        searchResults,
        setSearchResults
    } = useContext(UserProfileContext)

    // useEffect(() => {
    //     getAllUserProfiles();
    // }, []);

    useEffect(() => {
        if (searchedName !== "") {
            searchUsersByName(searchedName);
        } else {
            getAllUserProfiles();
        }
    }, [searchedName]);

    const handleControlledInputChange = (evt) => {
        let newSearch = { ...searchedName };
        newSearch = evt.target.value;
        setSearchedName(newSearch);
    };

    const [splitz, setSplitz] = useState({
        "splitzName": "",
        "date": "",
        "splitzDetails": "",
        "splitzPic": ""
    })

    const [splitzUsers, setSplitzUsers] = useState([])

    const handleClickSaveSplitz = (event) => {
        event.preventDefault()

        addSplitz({
            splitzName: splitz.splitzName,
            date: splitz.date,
            splitzDetails: splitz.splitzDetails,
            splitzPic: splitz.splitzPic,
            splitzUsers: splitzUsers
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

    const handleAddUserToSplitz = (event) => {
        const users = [...splitzUsers]
        users.push(parseInt(event.target.id))
        setSplitzUsers(users)
    }

    useEffect(() => {
        console.log(splitzUsers)
    }, [splitzUsers])

    return (<>
        <Form className="padding seeBot bkgwhite">
            <h1 className="purple center">Let's Add A Splitz!</h1>
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
                 You may not remember what this splitz was all about. So I’ve written a few notes about it to jog your memory.\
                Love,\
                 Current You`}
                onChange={handleInputChange}>
            </Input>
            <div className="container margBot">
                <div className="row justify-content-center">
                    <div className="cards-column flexRow">
                        {userProfiles.map((userProfile) => (
                            <details key={userProfile.id}>
                                <summary className="white"><img className="a" src={userProfile.profilePic} alt={userProfile.firstName}></img></summary>
                                <div className="flexRow" >
                                    <FontAwesomeIcon className="" id={userProfile.id} onClick={handleAddUserToSplitz} icon={faPlusCircle} />
                                    <div>{userProfile.firstName}</div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flexRow">
                <Input
                    type="search"
                    name="search-term"
                    id="search-term"
                    autoComplete="off"
                    value={searchedName}
                    onChange={handleControlledInputChange}
                    className="margBot"
                    placeholder="Who is Spitzing with you?"
                >
                </Input>
                <Button
                    className="margBot"
                    onClick={(evt) => {
                        evt.preventDefault();
                        searchUsersByName(searchedName);
                    }}
                ><FontAwesomeIcon className="" icon={faSearch} /></Button>
            </div>



            <div className="center">
                <Button id="btn" className="margBot" onClick={handleClickSaveSplitz}>Save Splitz</Button>

            </div>
        </Form>
    </>)
};

export default SplitzAdd;