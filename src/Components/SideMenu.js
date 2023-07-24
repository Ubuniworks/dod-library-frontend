import * as React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import API from "../api/api";
import {NavLink} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

export default function SideMenu() {
    const [open, setOpen] = React.useState(false);

    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const handleClick = () => {
        setOpen(!open);
    };

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
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            style={{
                backgroundColor: '#002060',
                height: '100%',
                flexDirection: 'column',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Menu
                </ListSubheader>
            }
        >
            <NavLink to="/" style={{textDecoration: 'none', color: 'white'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon style={{
                            color: 'white'
                        }}/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
            </NavLink>
            <NavLink to={"library/"} style={{textDecoration: 'none', color: 'white'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <LibraryBooksIcon
                            style={{
                                color: 'white'
                            }}/>
                    </ListItemIcon>
                    <ListItemText primary="Library"
                                  style={{
                                      color: 'white'
                                  }}/>
                </ListItemButton>
            </NavLink>
            <NavLink to={"lessons/"} style={{textDecoration: 'none', color: 'white'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <HistoryEduIcon
                            style={{
                                color: 'white'
                            }}/>
                    </ListItemIcon>
                    <ListItemText primary="Lessons Learnt"
                                  style={{
                                      color: 'white'
                                  }}/>
                </ListItemButton>
            </NavLink>

            {isAdmin ?
                <>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon
                                style={{
                                    color: 'white'
                                }}/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"
                                      style={{
                                          color: 'white'
                                      }}/>
                        {open ? <ExpandLess
                            style={{
                                color: 'white'
                            }}/> : <ExpandMore
                            style={{
                                color: 'white'
                            }}/>}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit
                              style={{
                                  color: 'white'
                              }}>
                        <List component="div" disablePadding>
                            <NavLink to={"settings/"}
                                     style={{
                                         textDecoration: 'none',
                                         color: 'white'
                                     }}>
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemIcon>
                                        <PeopleIcon
                                            style={{
                                                color: 'white'
                                            }}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Manage Users"/>
                                </ListItemButton>
                            </NavLink>
                            <NavLink to={"uploads/"}
                                     style={{
                                         textDecoration: 'none',
                                         color: 'white'
                                     }}>
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemIcon>
                                        <UploadFileIcon
                                            style={{
                                                color: 'white'
                                            }}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Uploads"/>
                                </ListItemButton>
                            </NavLink>
                            <NavLink to={"categories/"}
                                     style={{
                                         textDecoration: 'none',
                                         color: 'white'
                                     }}
                            >
                                <ListItemButton sx={{pl: 4}}>
                                    <ListItemIcon
                                        style={{
                                            color: 'white'
                                        }}>
                                        <CategoryIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Manage Categories"/>
                                </ListItemButton>
                            </NavLink>
                        </List>
                    </Collapse>
                </>
                : null}
            <ListItemButton
                style={{
                    color: 'white'
                }}
                onClick={logout}
            >
                <ListItemIcon
                    style={{
                        color: 'white'
                    }}>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout"/>
            </ListItemButton>
        </List>

    )
}
