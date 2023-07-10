import React from "react";
import {Button, Container, Grid, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {Outlet} from "react-router-dom";
import SideMenu from "./SideMenu";

export default function MainLayout() {
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
                maxHeight: "100vh"
            }}>
                <Grid
                    container
                    justifyContent={"center"}
                    style={{
                        backgroundColor: "white",
                        marginTop: 5,
                        borderRadius: 20,
                        padding: 7,
                    }}
                >
                    <Grid
                        item
                        style={{
                            marginTop: 10,
                            alignItems: "center"
                        }}
                    >

                        <Button
                            startIcon={<SearchIcon color={"white"}/>}
                            style={{
                                backgroundColor: "#002060",
                                borderRadius: 10,
                                alignItems: "center",
                                marginLeft: 10,
                            }}
                        >
                            <Typography variant={"body2"} color={"white"}>
                                Filter
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Outlet/>
            </div>

        </div>
    )
}

