import React, { useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export const FooterMenu = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <div>

            <Nav className="footer padding8">

                {isLoggedIn &&
                    <NavItem className="nav-items pink flex m8">
                        <NavLink id="textColorWhite" tag={RRNavLink} to="/mySplitz">Splitz</NavLink>
                        <NavLink id="textColorWhite" tag={RRNavLink} to="/addSplitz">
                            <FontAwesomeIcon className="fontSize20" icon={faPlusCircle} />
                        </NavLink>
                        <NavLink id="textColorWhite" tag={RRNavLink} to="">Balance</NavLink>
                    </NavItem>
                }

            </Nav>

        </div>
    )
}

export default FooterMenu;