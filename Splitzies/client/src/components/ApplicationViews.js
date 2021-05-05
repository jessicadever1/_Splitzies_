import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";
import Login from "./Login/Login";
import Register from "./Login/Register";
import SplitzList from "./Splitz/SplitzList";
import SplitzProvider from "./providers/SplitzProvider";
import SplitzDetails from "./Splitz/SplitzDetails";
import SplitzAdd from "./Splitz/SplitzAdd";
import './appViews.css';

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route path="/" exact>
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzList /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

                <Route exact path="/mySplitz">
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzList /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

                <Route exact path="/splitzDetails/:id(\d+)">
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzDetails /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

                <Route exact path="/addSplitz">
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzAdd /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

            </Switch>
        </main>
    );
};