import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { SplitzContext } from "../providers/SplitzProvider";
import { useParams, Link } from "react-router-dom";
import "./splitz.css";

export const SplitzDetails = () => {
    const [splitz, setSplitz] = useState({ splitz: {} });
    const { getSplitzById } = useContext(SplitzContext);
    const { id } = useParams();

    useEffect(() => {
        getSplitzById(id).then(setSplitz)
    }, []);


    return (
        <div>
            <Card className="m-4">
                <p className="text-left px-2">{splitz.splitzName}</p>
                <CardImg top src={splitz.splitzPic} alt={splitz.splitzName} />
                <CardBody>
                    <p>
                        <strong>{post.title}</strong>
                    </p>
                    <p>{post.content}</p>
                    <p>{new Date(post.publishDateTime).toLocaleDateString()}</p>
                    <Button className="b addComment"><Link className="a" to={`/comment/create/${post.id}`}>Add Comment</Link></Button>
                </CardBody>

                <div className="">
                    <CommentList />
                </div>
            </Card>
        </div>
    );
};

export default PostDetails;