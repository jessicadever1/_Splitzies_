import React, { useContext, useEffect, useState } from "react";
import { SplitzContext } from "../providers/SplitzProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./splitz.css"

export const SplitzEdit = () => {

    const { getSplitzById, editSplitz } = useContext(SplitzContext)
    const history = useHistory();
    const { splitzId } = useParams()
    const sId = parseInt(splitzId)
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

    const handleSearchedInputChange = (evt) => {
        let newSearch = { ...searchedName };
        newSearch = evt.target.value;
        setSearchedName(newSearch);
    };

    const [splitz, setSplitz] = useState({
        "id": sId,
        "splitzName": "",
        "date": "",
        "splitzDetails": "",
        "splitzPic": ""
    })

    const [splitzUsers, setSplitzUsers] = useState([])

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
                    splitzUsers: splitzUsers,
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

    const handleAddUserToSplitz = (event) => {
        const users = [...splitzUsers]
        users.push(parseInt(event.target.id))
        setSplitzUsers(users)
    }

    let usersOnSplitz = splitz.userProfiles

    useEffect(() => {
        console.log(splitzUsers)
    }, [splitzUsers])

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    const nonCurrentUserProfiles = userProfiles.filter((userProfile) => userProfile.id !== currentUser.id)

    return usersOnSplitz ? (
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

                <div className="container margBot">
                    <div className="row justify-content-center">
                        <div className="cards-column flexRow">
                            {nonCurrentUserProfiles.map((userProfile) => (

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
                        onChange={handleSearchedInputChange}
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
                <div className="flexRow">
                    <div>
                        {usersOnSplitz.map((user) => {
                            return (
                                <>
                                    <img className="a" key={user.id} src={user.profilePic}></img>
                                </>
                            )
                        })}
                    </div>
                </div>

                <div className="center">
                    <Button id="btn" className="margBot" onClick={handleClickSaveSplitz}>Savezies</Button>
                    <Button id="btn" className="margBot"><Link className="b" to={`/splitzDetails/${splitz.id}`} >Nevermind, My Bad</Link></Button>
                </div>

            </Form>
        </div>
    ) : null;
}

export default SplitzEdit;