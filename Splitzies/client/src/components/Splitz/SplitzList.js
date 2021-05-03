import React, { useContext, useEffect } from "react";
import { SplitzContext } from "../providers/SplitzProvider";
import Splitz from "./SplitzCard";

export const SplitzList = () => {
    const { splitzies, getMySplitzies } = useContext(SplitzContext);

    useEffect(() => {
        getMySplitzies();
        console.log("List of Splitzies:", splitzies)
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {splitzies.map((splitz) => {

                        return <Splitz key={splitz.id} splitz={splitz} />
                    })}
                </div>
            </div>
        </div>
    );
};
export default SplitzList;