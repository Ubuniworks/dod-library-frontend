import React from 'react';
import {Box, Button, Grid, Modal, TextField} from "@mui/material";
import PDFViewer from "./PDFViewer";


export default function ViewLesson({open, setOpen, lesson}) {
    return (
        <Modal open={open}
               style={{
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
               }}
        >
            <Box sx={{
                width: "80%",
                height: "90%",
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "25px",
                overflow: "auto",
            }}>
                <Button
                    variant="contained"
                    style={{
                        marginBottom: "20px",
                    }}
                    onClick={() => {
                        setOpen(false)
                    }}>
                    Close
                </Button>
                <h1>{lesson.title}</h1>
                <Grid container>
                    <Grid item xs={12}>
                        <p>{lesson.content}</p>
                    </Grid>
                    <Grid item xs={12}>
                    {/*    Display PDF content here*/}
                        <PDFViewer url={lesson.attachment}/>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
