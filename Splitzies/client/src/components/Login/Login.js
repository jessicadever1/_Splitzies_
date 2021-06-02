import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./login.css";
import logo from "../images/splitzites.png"

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/mySplitz"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <>
            <img className="logoSize" src={logo}></img>
            <Form onSubmit={loginSubmit} className="p backgroundWhite">
                <fieldset id="border" className="ptb">
                    <FormGroup className="pt">
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="pt">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup id="noMarg" className="p jcc ">
                        <Button id="btn">Login</Button>
                    </FormGroup>
                    <em className="pt">
                        <div className="jcc">Are you new here? Let's get you</div>
                        <Link to="register" className="jcc mb">Registered!</Link>
                    </em>
                </fieldset>
            </Form>
        </>
    );
}