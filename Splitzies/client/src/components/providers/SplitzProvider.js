import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SplitzContext = React.createContext();

export const SplitzProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [splitzies, setSplitzies] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const apiUrl = "/api/Splitz";

    const getMySplitzies = () => {

        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/MySplitz`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then(setSplitzies);
    };

    const getSplitzById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json()))
    };



    const addSplitz = (splitz) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(splitz),
            }))
    };


    const deleteSplitz = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(getMySplitzies)
        )
    };

    return (
        <SplitzContext.Provider
            value={{
                getMySplitzies,
                splitzies,
                setSplitzies,
                searchTerms,
                setSearchTerms,
                getSplitzById,
                addSplitz,
                deleteSplitz
            }}
        >
            {props.children}
        </SplitzContext.Provider>
    );
};
export default SplitzProvider;