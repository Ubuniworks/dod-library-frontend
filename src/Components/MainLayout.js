import React, {useState} from "react";
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card, CardContent, Container, Grid, IconButton, TextField, Typography,} from "@mui/material";
import {Outlet} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import SideMenu from "./SideMenu";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../api/api";
import ReviewModal from "../pages/Library/components/ReviewModal";
import { useLocation } from 'react-router-dom';

Object.defineProperty(String.prototype, "capitalize", {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
});

export default function MainLayout() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [modalBook, setModalBook] = React.useState({})
    const [reviewModalStatus, setReviewModalStatus] = React.useState(false)
    let first_name = localStorage.getItem("user_first_name").capitalize();
    let last_name = localStorage.getItem("user_last_name").capitalize();
    let username = localStorage.getItem("username").capitalize();

    const location = useLocation();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCardClick = (book) => {
        setModalBook(book);
        setReviewModalStatus(true);
    };



    function search() {
        Api.post("/library/books/advanced_search/", {
            "search_term": searchTerm,
        }).then((response) => {
            if (response.data["results"].length === 0) {
                alert("No results found")
                return;
            } else {
                setResults(response.data["results"]);
                handleOpen()
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div style={{
            display: "flex",
            // position: "absolute",
            margin: 0,
            padding: 0,
            height: "98vh",
        }}>
            <Container style={{
                maxWidth: "250px",
                padding: 0,
                margin: 0,
                // height: "100%",
            }}>
                <SideMenu/>
            </Container>
            <div style={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                overflowY: "auto",
                overflowX: "hidden",
            }}>
                <Grid
                    item
                    justifyContent={"space-between"}
                    style={{
                        backgroundColor: "white",
                        margin: 0,
                        borderRadius: 5,
                        padding: 0,
                    }}
                >
                    {/*For other items in the header*/}
                    <Grid item xs={8}
                          justifyContent={"center"}
                          justifyItems={"center"}
                          alignItems={"center"}
                          style={{
                              alignItems: "center",
                              }}
                    >
                        {/*<TextField*/}
                        {/*    value={searchTerm}*/}
                        {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
                        {/*    placeholder="Enter search term e.g book title or author name"*/}
                        {/*    variant="outlined"*/}
                        {/*    required={true}*/}
                        {/*    justifyItems={"center"}*/}
                        {/*    justifyContent={"center"}*/}
                        {/*    style={{*/}
                        {/*        width: 400,*/}
                        {/*        // alignItems: "center",*/}
                        {/*        justifyContent: "center",*/}
                        {/*        justifyItems: "center",*/}
                        {/*        marginLeft: 250,*/}
                        {/*    }}*/}
                        {/*    InputProps={{*/}
                        {/*        endAdornment: (*/}
                        {/*            <IconButton*/}
                        {/*                onClick={search}*/}
                        {/*            >*/}
                        {/*                <SearchIcon/>*/}
                        {/*            </IconButton>*/}
                        {/*        ),*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <Dialog open={open} onClose={handleClose} maxWidth="md">
                            <DialogTitle>Search Results</DialogTitle>
                            <DialogContent>
                                {results.map((result) => (
                                    <div
                                        key={result.id}
                                        onClick={() => {
                                            handleCardClick(result);
                                        }}
                                        style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                                        <Typography variant="h6">{result.title}</Typography>
                                        <Typography>Author: {result.author}</Typography>
                                        {/* Add other fields you want to display */}
                                    </div>
                                ))}
                            </DialogContent>
                            <ReviewModal
                                book={modalBook}
                                reviewModalStatus={reviewModalStatus}
                                setReviewModalStatus={setReviewModalStatus}
                            />
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Grid>
                    {/*For the Logged in user name display*/}
                    <Grid
                        xs={4}
                        item
                        style={{
                            marginTop: 10,
                            alignItems: "right"
                        }}
                    >
                        <Grid item>
                            <Card
                                style={{
                                    // display: "flex",
                                    alignItems: "right",
                                    // maxHeight: 30,
                                    boxShadow: "none",
                                }}
                            >
                                <CardContent>
                                    <Typography align={"right"}>
                                        {username}
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
                    padding: 0,
                }}>
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}

