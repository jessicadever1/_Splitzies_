import React, { useContext, useState, useEffect } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AddUser from "../images/AddUser.png"
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
        console.log("users", users)
    }

    useEffect(() => {
        console.log(splitzUsers)
    }, [splitzUsers])

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    const nonCurrentUserProfiles = userProfiles.filter((userProfile) => userProfile.id !== currentUser.id)

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
                        {nonCurrentUserProfiles.map((userProfile) => (

                            <div key={userProfile.id} onClick={handleAddUserToSplitz}>
                                <a className="white">
                                    <img className="a imgAdd" id={userProfile.id} src={userProfile.profilePic} alt={userProfile.firstName}></img>
                                    <img className="a" id={userProfile.id} src={AddUser} alt={userProfile.firstName}></img>
                                </a>


                            </div>
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
            <div>
                <p className="blue center font8">***Note: When You click on a photo, that user is added to your splitz. We know not having a list of who you have selected isn't ideal. Thank you for your patience!*** </p>
            </div>
            <div className="center">

            </div>


            <div className="center">
                <Button id="btn" className="margBot" onClick={handleClickSaveSplitz}>Save Splitz</Button>

            </div>
        </Form>
    </>)
};

export default SplitzAdd;