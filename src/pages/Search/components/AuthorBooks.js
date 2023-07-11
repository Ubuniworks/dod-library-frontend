import React from 'react';
import {Box, Card, CardContent, CardMedia, Grid, Modal, Typography} from "@mui/material";

export default function AuthorBooksModal({modalStatus, setModalStatus, books, author}) {
    const handleClose = () => {
        setModalStatus(false);
    };

    return (
        <Modal
            open={modalStatus}
            onClose={handleClose}
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
                <Typography
                    variant={"h4"}
                >
                    Books by {author}
                </Typography>
                <Grid container
                      spacing={2}
                      style={{
                          backgroundColor: '#FFFFFF',
                          padding: '10px',
                          borderRadius: '10px',
                          margin: '0px',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add the box-shadow
                      }}
                >
                    {books.map((book) => (
                        <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                            <Card style={{
                                borderRadius: 10,
                            }}>
                                <CardMedia
                                    component="img"
                                    alt={book.title}
                                    height="200"
                                    width="100"
                                    image={book.cover_image}
                                />
                            </Card>
                            <CardContent>
                                <a
                                    href={book.pdf_file}
                                    download={book.title}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                    style={{marginRight: '10px'}}>
                                    <Typography variant="subtitle" style={{color: '#002060'}}>
                                        Download
                                    </Typography>
                                </a>
                            </CardContent>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Modal>
    );
}
