import React from "react";
import {Button, MenuItem, MenuList} from "@mui/material";
import {NavLink} from "react-router-dom";
import API from "../api/api";
import LogoutIcon from '@mui/icons-material/Logout';

export default function SideMenu() {

    const isAdmin = localStorage.getItem('is_admin') === 'true';

    function logout() {
        API.post("auth/logout/", {
            "token": localStorage.getItem("auth_token"),
            "email": localStorage.getItem("user_email"),
        })
            .then(() => {
                localStorage.clear();
                window.location.href("/login/")
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
                    <NavLink to="/notices" style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>Notices</MenuItem>
                    </NavLink>
                    <NavLink to="/library" style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>Library</MenuItem>
                    </NavLink>
                    <NavLink to={"lessons/"} style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>Lessons Learnt</MenuItem>
                    </NavLink>
                    <NavLink to={"search/"} style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>Search</MenuItem>
                    </NavLink>

                    <NavLink to={"requests/"} style={{textDecoration: 'none', color: 'white'}}>
                        <MenuItem>Request Book</MenuItem>
                    </NavLink>
                    {isAdmin ?
                        <NavLink to={"settings/"} style={{textDecoration: 'none', color: 'white'}}>
                            <MenuItem>Settings</MenuItem>
                        </NavLink>
                        : null}


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
