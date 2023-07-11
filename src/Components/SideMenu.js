import React from "react";
import {MenuItem, MenuList} from "@mui/material";
import {NavLink} from "react-router-dom";
import API from "../api/api";


export default function SideMenu() {

    function logout() {
        API.post("logout/user/", {
            "token": localStorage.getItem("auth_token"),
            "email": localStorage.getItem("user_email"),
        })
            .then(() => {
                localStorage.clear();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                // Clear localStorage anyway
                localStorage.clear();
                window.location.reload();
            });
    }

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
