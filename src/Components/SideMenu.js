import React from "react";
import {MenuList, MenuItem} from "@mui/material";


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
                <MenuItem>My Books</MenuItem>
                <MenuItem>Library</MenuItem>
                <MenuItem>Search</MenuItem>
                <MenuItem>Settings</MenuItem>
            </MenuList>
        </div>
    )
}
