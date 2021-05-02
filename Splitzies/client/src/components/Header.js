import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";
import './header.css'

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    return (
        <div>
            <Navbar className="pink" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/" id="textColorWhite">Splitzies</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home and Post links */}
                        {isLoggedIn &&
                            <NavItem className="nav-items pink">
                                <NavLink id="textColorWhite" tag={RRNavLink} to="/">Splitz</NavLink>
                                <NavLink id="textColorWhite" tag={RRNavLink} to="">+</NavLink>
                                <NavLink id="textColorWhite" tag={RRNavLink} to="">Balance</NavLink>
                            </NavItem>
                        }
                        {isLoggedIn && userProfile.userTypeId === 1 &&
                            <NavItem className="nav-items">
                                <NavLink tag={RRNavLink} to="">Tag Management</NavLink>
                                <NavLink tag={RRNavLink} to="">User Profiles</NavLink>
                            </NavItem>
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}
