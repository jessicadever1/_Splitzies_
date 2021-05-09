import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";
import Login from "./Login/Login";
import Register from "./Login/Register";
import SplitzList from "./Splitz/SplitzList";
import SplitzProvider from "./providers/SplitzProvider";
import SplitzDetails from "./Splitz/SplitzDetails";
import SplitzAdd from "./Splitz/SplitzAdd";
import SplitzDelete from "./Splitz/SplitzDelete";
import SplitzEdit from "./Splitz/SplitzEdit";
import CategoryList from "./Category/CategoryList";
import CategoryProvider from "./providers/CategoryProvider";
import ExpenseProvider from "./providers/ExpenseProvider";
import ExpenseList from "./Expense/ExpenseList";
import ExpenseAdd from "./Expense/ExpenseAdd";
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

                <Route exact path="/category">
                    <CategoryProvider>
                        {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
                    </CategoryProvider>
                </Route>

                <Route exact path="/expense/:id(\d+)">
                    <SplitzProvider>
                        <CategoryProvider>
                            <ExpenseProvider>
                                {isLoggedIn ? <ExpenseList /> : <Redirect to="/login" />}
                            </ExpenseProvider>
                        </CategoryProvider>
                    </SplitzProvider>
                </Route>

                <Route exact path="/addExpense/:id(\d+)">
                    <SplitzProvider>
                        <CategoryProvider>
                            <ExpenseProvider>
                                {isLoggedIn ? <ExpenseAdd /> : <Redirect to="/login" />}
                            </ExpenseProvider>
                        </CategoryProvider>
                    </SplitzProvider>
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
                        <ExpenseProvider>
                            <CategoryProvider>
                                {isLoggedIn ? <SplitzAdd /> : <Redirect to="/login" />}
                            </CategoryProvider>
                        </ExpenseProvider>
                    </SplitzProvider>
                </Route>

                <Route exact path="/splitzDelete/:id(\d+)">
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzDelete /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>

                <Route exact path="/splitzEdit/:splitzId(\d+)">
                    <SplitzProvider>
                        {isLoggedIn ? <SplitzEdit /> : <Redirect to="/login" />}
                    </SplitzProvider>
                </Route>


            </Switch>
        </main>
    );
};