import React, { useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

export function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    //const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    return (
        <div>
            <Navbar className="pink" >
                <NavbarBrand tag={RRNavLink} to="/" className="textColorWhite center">Splitzies</NavbarBrand>
                <NavItem>
                    <Nav>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <a aria-current="page" className="vertical-center"
                                        style={{ cursor: "pointer" }} onClick={logout}><FontAwesomeIcon className="textColorWhite" icon={faDoorOpen} /></a>
                                </NavItem>
                            </>
                        }
                    </Nav>

                </NavItem>
            </Navbar>
        </div >
    );
};

export default Header;
/*

                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

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
                </Collapse>*/