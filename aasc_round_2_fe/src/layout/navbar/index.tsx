import React from "react";

import { ROUTER_APP } from "@/constants/router";
import { useNavigate } from "react-router-dom";

import classes from "./styles.module.css";


const listNavbar = [
    ROUTER_APP.CONTACT,
    ROUTER_APP.BANK,
]

const Navbar: React.FC = () => {
    const navigation = useNavigate();

    const handleNavigation = (link: string) => {
        navigation(link);
    }

    const pathname = window.location.pathname;

    return (
        <div className={classes.root}>
            {
                listNavbar.map((item, index) =>
                    <div
                        key={index}
                        className={`${classes.link} ${pathname === item.href && classes.link_active}`}
                        onClick={() => handleNavigation(item.href)}
                    >{item.name}</div>
                )
            }
        </div>
    )
}

export default Navbar;