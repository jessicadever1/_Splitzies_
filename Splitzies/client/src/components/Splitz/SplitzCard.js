import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./splitz.css";

export const Splitz = ({ splitz }) => {

    return (
        <Card className="m-4">
            <CardBody>
                <CardImg>
                    <i className="fas fa-route pink"></i>
                </CardImg>
                <div>
                    <Link to="">{splitz.splitzName}</Link>
                    <p>{splitz.date}</p>
                </div>
                <CardImg>
                    <i class="fas fa-comments-dollar blue"></i>
                </CardImg>
            </CardBody>
        </Card>
    );
};

export default Splitz;
