import React from "react";
import {MenuItem, MenuList} from "@mui/material";
import {NavLink} from "react-router-dom";


export default function SideMenu() {
    return (
        <div style={{
            backgroundColor: "#002060",
            height: "100%",
        }}>
            <MenuList
                style={{
                    color: "white",
                }}
            >
                <NavLink to={"/"} style={{
                    textDecoration: "none",
                    color: "white",
                }}>
                    <MenuItem>My Books</MenuItem>
                </NavLink>
                <NavLink to={"/library"} style={{
                    textDecoration: "none",
                    color: "white",
                }}>
                    <MenuItem>Library</MenuItem>
                </NavLink>
                <MenuItem>Search</MenuItem>
                <MenuItem>Settings</MenuItem>
            </MenuList>
        </div>
    )
}
