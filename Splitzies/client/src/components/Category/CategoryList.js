import React, { useContext, useEffect } from 'react';
import { CategoryContext } from '../providers/CategoryProvider';
import './category.css';

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <h2>Categories</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        <select>
                            <option value="0">Select a Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;