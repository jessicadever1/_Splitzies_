import React, { useContext, useEffect } from 'react';
import { CategoryContext } from '../providers/CategoryProvider';
import { CategoryCard } from './CategoryCard';
import './category.css';

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    console.log("these are my categories", categories)

    return (
        <>
            <h2>Categories</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        {categories.map((category) => (

                            <CategoryCard key={category.id} category={category} />

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;