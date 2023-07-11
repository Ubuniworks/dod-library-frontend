import React from "react";
import {Box, Button, Card, CardContent, CardMedia, Modal, Typography} from "@mui/material";

export default function ReviewModal({modalStatus, setModalStatus, onClose, book}) {
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
                padding: "20px",
                overflow: "scroll",
            }}>
                <Button
                    style={{
                        backgroundColor: "#002060",
                        borderRadius: 15,
                        color: "white",
                        alignItems: "center",
                        borderBottom: 3
                    }}
                    onClick={() => {
                        setModalStatus(false);
                    }}
                >
                    close</Button>
                <h1>{book.title}</h1>
                <Card
                    style={{ display: 'flex' }}
                >
                    <CardMedia
                        component="img"
                        alt={book.title}
                        image={book.cover_image}
                        style={{
                            width: '300px',
                            height: '350px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}

                    />
                    <CardContent style={{ flexGrow: 1 }}>
                        <Typography variant="h2">{book.title}</Typography>
                        <Typography variant="h3">{book.author}</Typography>
                        <Typography variant="subtitle2">{book.background_info}</Typography>
                    </CardContent>
                </Card>
                <Button variant={"contained"}>Read</Button>
            </Box>
        </Modal>
    )
}
