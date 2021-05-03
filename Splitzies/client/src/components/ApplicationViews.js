import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "./providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"
import SplitzList from "./Splitz/SplitzList";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>

                <Route path="/" exact>

                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path="/mySplitz">
                    <SplitzList />
                </Route>

            </Switch>
        </main>
    );
};