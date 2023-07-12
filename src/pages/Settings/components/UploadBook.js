import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, MenuItem, Modal, TextField, Typography} from '@mui/material';
import API from "../../../api/api";

const AddBookModal = ({open, setOpen}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [backgroundInfo, setBackgroundInfo] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [topics, setTopics] = useState([]); // Replace with your list of topics

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'title') setTitle(value);
        if (name === 'author') setAuthor(value);
        if (name === 'backgroundInfo') setBackgroundInfo(value);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
        console.log(event.target.value)
    };


    // Perform form submission and data processing
    function uploadBook(event, title, author, file, coverImage, info, selectedTopic) {
        event.preventDefault();
        // post form data to backend
        let formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('background_info', info);
        formData.append('topic', selectedTopic);
        formData.append('pdf_file', file);
        formData.append('cover_image', coverImage);

        API.post('/library/books/upload_book/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, timeout: 90000,
        }).then((response) => {
            if (response.status === 201) {
                alert("Book added successfully")
                window.location.href = "/library/"
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        API.get("/library/books/get_topics/")
            .then((response) => {
                setTopics(response.data)
            })
    }, [])

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
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Author"
                                    name="author"
                                    value={author}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Topic"
                                    name="topic"
                                    value={selectedTopic}
                                    onChange={handleTopicChange}
                                    fullWidth
                                    required
                                >
                                    {topics.map((topic) => (
                                        <MenuItem key={topic.id} value={topic.id}>
                                            {topic.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Upload Book
                                </Typography>
                                <input type="file"
                                       accept=".pdf"
                                       onChange={(event) =>
                                           setFile(event.target.files[0])}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Book Cover
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setCoverImage(event.target.files[0])}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Background Info"
                                    name="backgroundInfo"
                                    value={backgroundInfo}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth
                                        onClick={(event) => {
                                            event.preventDefault();
                                            uploadBook(event, title, author, file, coverImage, backgroundInfo, selectedTopic)
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

export default AddBookModal;
