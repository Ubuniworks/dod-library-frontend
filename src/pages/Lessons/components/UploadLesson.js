import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, MenuItem, Modal, TextField, Typography} from '@mui/material';
import API from "../../../api/api";

const AddLessonModal = ({open, setOpen}) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [backgroundInfo, setBackgroundInfo] = useState('');




    // Perform form submission and data processing
    function uploadLesson(event, title, file, info) {
        event.preventDefault();
        // post form data to backend
        let formData = new FormData();
        formData.append('title', title);
        formData.append('lesson_body', info);
        formData.append('attachment', file);

        console.log(formData)

        API.post('/library/lessons/upload_lesson/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, timeout: 140000,
        }).then((response) => {
            if (response.status === 201) {
                alert("Lesson added successfully")
                window.location.href = "/library/"
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    // useEffect(() => {
    //     API.get("/library/books/get_topics/")
    //         .then((response) => {
    //             setTopics(response.data)
    //         })
    // }, [])
    //
    // useEffect(() => {
    //     API.get("/library/books/get_classifications/")
    //         .then((response) => {
    //             setClassifications(response.data)
    //         })
    // }, [])

    return (
        <Modal open={open}
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
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Upload Attachment
                                </Typography>
                                <input type="file"
                                       accept=".pdf"
                                       onChange={(event) =>
                                           setFile(event.target.files[0])}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Content"
                                    name="content"
                                    onChange={(event) => setBackgroundInfo(event.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth
                                        onClick={(event) => {
                                            event.preventDefault();
                                            uploadLesson(event, title, file,  backgroundInfo)
                                        }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </>
        </Modal>
    );
};

export default AddLessonModal;
