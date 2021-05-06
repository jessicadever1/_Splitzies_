import React, { useContext, useEffect } from "react";
import { SplitzContext } from "../providers/SplitzProvider";
import Splitz from "./SplitzCard";

export const SplitzList = () => {
    const { splitzies, getMySplitzies } = useContext(SplitzContext);

    useEffect(() => {
        getMySplitzies();
    }, []);

    return (
        <div className="container padBot">
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