import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    NavBar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";
import './footer.css'

export const FooterMenu = () => {
    const { isLoggedIn, logout } = useContext(UserProfileContext);

    return (
        <div>

            <Nav className="footer" navbar>

                {isLoggedIn &&
                    <NavItem className="nav-items pink flex">
                        <NavLink id="textColorWhite" tag={RRNavLink} to="/mySplitz">Splitz</NavLink>
                        <NavLink id="textColorWhite" tag={RRNavLink} to="">+</NavLink>
                        <NavLink id="textColorWhite" tag={RRNavLink} to="">Balance</NavLink>
                    </NavItem>
                }

            </Nav>

        </div>
    )
}

export default FooterMenu;