import React from "react";

export const CategoryCard = ({ category }) => {

    return (
        <>
            <select>
                <option value="0">TBD</option>
                <option value={category.id}>{category.categoryName}</option>
            </select>


        </>
    )
};

export default CategoryCard;