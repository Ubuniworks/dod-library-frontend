import React from "react";
import {Avatar, Card, CardContent, Container, Grid, IconButton, Typography,} from "@mui/material";
import {Outlet} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import SideMenu from "./SideMenu";


Object.defineProperty(String.prototype, "capitalize", {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
});

export default function MainLayout() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let first_name = localStorage.getItem("user_first_name").capitalize();
    let last_name = localStorage.getItem("user_last_name").capitalize();
    let user_type = localStorage.getItem("user_type");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <div style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            margin: 0,
            padding: 0,
            height: "100%",
        }}>
            <Container style={{
                maxWidth: "250px",
                padding: 0,
                margin: 0,
                height: "100%",
            }}>
                <SideMenu/>
            </Container>
            <div style={{
                backgroundColor: "#E5E5E5",
                height: "100%",
                width: "100%",
                overflowY: "auto",
                // maxHeight: "100vh"
            }}>
                <Grid
                    container
                    justifyContent={"space-between"}
                    style={{
                        backgroundColor: "white",
                        margin: 5,
                        borderRadius: 20,
                        padding: 7,
                    }}
                >
                    {/*For other items in the header*/}
                    <Grid item>
                        </Grid>
                    {/*For the Logged in user name display*/}
                    <Grid
                        item
                        style={{
                            marginTop: 10,
                            alignItems: "center"
                        }}
                    >
                        <Grid item>
                            <Card
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    maxHeight: 30,
                                    boxShadow: "none",
                                }}
                            >
                                <CardContent>
                                    <Typography align={"right"}>
                                        {first_name} {last_name}
                                    </Typography>
                                    <Typography variant={"caption"} color={"#77c0a3"}>
                                        {user_type}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/*<Button*/}
                        {/*    startIcon={<SearchIcon color={"white"}/>}*/}
                        {/*    style={{*/}
                        {/*        backgroundColor: "#002060",*/}
                        {/*        borderRadius: 10,*/}
                        {/*        alignItems: "center",*/}
                        {/*        marginLeft: 10,*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Typography variant={"body2"} color={"white"}>*/}
                        {/*        Filter*/}
                        {/*    </Typography>*/}
                        {/*</Button>*/}
                    </Grid>
                </Grid>
                {/*Main Content*/}
                <div style={{
                    marginTop: 10,
                    padding: 10,
                }}>
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}

