import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./splitz.css";

export const Splitz = ({ splitz }) => {
    console.log(splitz.splitzName)
    return (
        <Card className="m-4">
            <CardBody>
                <i className="fas fa-route pink"></i>
                <div>
                    <Link to="">{splitz.splitzName}</Link>
                    <p>{splitz.date}</p>
                </div>
                <i className="fas fa-comments-dollar blue"></i>
            </CardBody>
        </Card>
    );
};

export default Splitz;
