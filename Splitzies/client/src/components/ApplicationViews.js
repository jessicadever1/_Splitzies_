import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "./providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"
import SplitzList from "./Splitz/SplitzList";
import SplitzProvider from "./providers/SplitzProvider";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>

                <Route path="/" exact>
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzList /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path="/mySplitz">
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzList /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

            </Switch>
        </main>
    );
};