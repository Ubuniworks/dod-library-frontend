import React from "react";
import {Button, MenuItem, MenuList} from "@mui/material";
import {NavLink} from "react-router-dom";
import API from "../api/api";
import LogoutIcon from '@mui/icons-material/Logout';

export default function SideMenu() {

    function logout() {
        API.post("auth/logout/", {
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
        <div style={{backgroundColor: '#002060', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <div style={{flexGrow: 1}}>
                <MenuList style={{color: 'white'}}>
                    <NavLink to="/" style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>My Books</MenuItem>
                    </NavLink>
                    <NavLink to="/library" style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>Library</MenuItem>
                    </NavLink>
                    <MenuItem>Search</MenuItem>
                    <MenuItem>Settings</MenuItem>
                </MenuList>
            </div>
            <div style={{paddingBottom: '1rem'}}>
                <MenuItem
                    onClick={logout}
                ><Button
                    style={{color: 'white'}}
                    startIcon={<LogoutIcon/>}
                >
                    Logout
                </Button>
                </MenuItem>
            </div>
        </div>
    )
}
