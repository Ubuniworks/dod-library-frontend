import React from "react";
import {Box, Button, Modal} from "@mui/material";

export default function ReviewModal({open, onClose, book}) {
    return (
        <Modal
            open={open}
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
            }}>
                <h1>{book.title}</h1>
                <Button variant={"contained"}>Read</Button>
            </Box>
        </Modal>
    )
}
