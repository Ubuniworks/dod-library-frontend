import React, {useEffect} from "react";
import {Box, Button, Grid, Modal, TextField} from "@mui/material";
import Api from "../../../api/api";

export default function RequestsPage({modalStatus, setModalStatus, onClose}) {
    const [bookTitle, setBookTitle] = React.useState("")
    const [bookAuthor, setBookAuthor] = React.useState("")
    const [bookYear, setBookYear] = React.useState(2000)


    function requestBook() {
        let data = {
            "name": bookTitle,
            "author": bookAuthor,
            "year": bookYear,
            "requested_by": localStorage.getItem('user_id'),
        }
        console.log(data)
        Api.post('library/requested-books/', data)
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    alert("Book requested successfully")
                    setModalStatus(false);
                }
            }).catch((error) => {
            console.log(error)
            }
        )

    }



    return (
        <Modal
            open={modalStatus}
            onClose={onClose}
            aria-labelledby="request_book"
            aria-describedby="This modal allows users to requests for books"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <>
                <Box sx={{
                    width: "80%",
                    height: "80%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "25px",
                    overflow: "auto",
                }}>
                    <Grid container direction={"column"} spacing={2}>
                        <Button
                            style={{
                                backgroundColor: "#002060",
                                borderRadius: 15,
                                color: "white",
                                alignItems: "center",
                                borderBottom: 3,
                                width: "100px",
                            }}
                            onClick={() => {
                                setModalStatus(false);
                            }}
                        >
                            close</Button>
                    </Grid>
                    {/*Book title*/}
                    <Grid item>
                        <TextField
                            id="outlined-basic"
                            label="Book Title"
                            variant="outlined"
                            style={{
                                width: "100%",
                                marginTop: "20px",
                            }}
                            onChange={(event) => {
                                setBookTitle(event.target.value)
                            }}

                        />
                    </Grid>
                    {/*Book author*/}
                    <Grid item>
                        <TextField
                            id="outlined-basic"
                            label="Book Author"
                            variant="outlined"
                            style={{
                                width: "100%",
                                marginTop: "20px",
                            }}
                            onChange={(event) => {
                                setBookAuthor(event.target.value)
                            }}
                        />
                    </Grid>
                    {/*Book year of publication*/}
                    <Grid item>
                        <TextField
                            id="outlined-basic"
                            label="Book Year of Publication"
                            variant="outlined"
                            type={"number"}
                            style={{
                                width: "100%",
                                marginTop: "20px",
                            }}
                            onChange={(event) => {
                                setBookYear(event.target.value)
                            }}
                        />
                    </Grid>
                    {/*Submit*/}
                    <Grid item>
                        <Button
                            style={{
                                backgroundColor: "#002060",
                                borderRadius: 15,
                                color: "white",
                                alignItems: "center",
                                borderBottom: 3,
                                marginTop: "20px"
                            }}
                            onClick={() => {
                                requestBook();
                                // setModalStatus(false);

                            }}
                        >
                            Submit</Button>

                    </Grid>
                </Box>
            </>
        </Modal>
    )
}
