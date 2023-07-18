import React from "react";
import {Box, Button, Card, CardContent, CardMedia, Grid, Modal, Typography} from "@mui/material";

export default function ReviewModal({modalStatus, setModalStatus, onClose, book}) {
    // const history = useHistory();


    const handleReadClick = () => {
        // Store the book data in localStorage or sessionStorage
        localStorage.setItem('book', JSON.stringify(book));

        // Navigate to the desired page
        window.location.href = '/read';
    };

    return (
        <Modal
            open={modalStatus}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
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

                    <Grid
                        style={{
                            marginTop: "10px",
                        }}
                    >

                        <Card
                            style={{display: 'flex', padding: "10px",}}
                        >
                            <CardMedia
                                component="img"
                                alt={book.title}
                                image={book.cover_image_url}
                                style={{
                                    width: '300px',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }}

                            />
                            <CardContent style={{flexGrow: 1}}>
                                <Typography variant="h2">{book.title}</Typography>
                                <Typography variant="h3">{book.author}</Typography>
                                <Typography variant="subtitle2">{book.background_info}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        style={{
                            margin: '10px',
                        }}
                    >
                        {/* Download link */}
                        {book.classification !== "Top Secret" ?
                        <a
                            href={book.pdf_file}
                            download={book.title}
                            target={"_blank"}
                            rel={"noreferrer"}
                            style={{marginRight: '10px'}}>
                            <Typography variant="body2" style={{color: '#002060'}}>
                                Download
                            </Typography>
                        </a> : null}

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 15,
                                color: '#000000',
                                border: '1px solid #002060',
                                height: '20px',
                            }}
                            onClick={() => {
                                setModalStatus(false);
                                handleReadClick();
                            }}
                        >
                            <Typography variant="body2">Read</Typography>
                            {/*<ReadMode book={book}/>*/}
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    )
}
