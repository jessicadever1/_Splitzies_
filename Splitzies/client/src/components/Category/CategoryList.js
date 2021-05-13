import React, { useContext, useEffect } from 'react';
import { Input } from 'reactstrap';
import { CategoryContext } from '../providers/CategoryProvider';
import './category.css';

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);



    return (
        <>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        <Input type="select" className="margBot">
                            <option value="0">Select a Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.categoryName}
                                </option>
                            ))}
                        </Input>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;