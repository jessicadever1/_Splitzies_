import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SplitzContext = React.createContext();

export const SplitzProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [splitzies, setSplitzies] = useState([]);
    const [splitz, setSplitz] = useState({});
    const [searchTerms, setSearchTerms] = useState("");

    const getMySplitzies = () => {

        return getToken()
            .then((token) =>
                fetch("/api/Splitz/MySplitz", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then(setSplitzies);
    };

    return (
        <SplitzContext.Provider
            value={{
                getMySplitzies,
                splitzies,
                setSplitzies,
                splitz,
                setSplitz,
                searchTerms,
                setSearchTerms
            }}
        >
            {props.children}
        </SplitzContext.Provider>
    );
};
export default SplitzProvider;