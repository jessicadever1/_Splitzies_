import React, { useState, useContext } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        fetch("/api/category", {
            method: "GET"
        }).then((res) => res.json())
            .then(setCategories)
    };
    return (
        <CategoryContext.Provider
            value={{
                categories,
                getAllCategories,
                setCategories
            }}
        >
        </CategoryContext.Provider >
    )
};

export default CategoryProvider;

