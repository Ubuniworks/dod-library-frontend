import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import API from "../../api/api";
import Api from "../../api/api";

const UploadBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [backgroundInfo, setBackgroundInfo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [topics, setTopics] = useState([]);
    const [classifications, setClassifications] = useState([]);
    const [selectedClassification, setSelectedClassification] = useState('');
    const [books, setBooks] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    const isAdmin = localStorage.getItem('is_admin') === 'true';

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'title') setTitle(value);
        if (name === 'author') setAuthor(value);
        if (name === 'backgroundInfo') setBackgroundInfo(value);
    };

    const handleTopicChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        Api.get("library/requested-books/").then(
            response => {
                setBooks(response.data["results"])
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [])


    // Perform form submission and data processing
    function uploadBook(event, title, year, author, file, coverImage, info, selectedTopic, selectedClassification) {
        // print time this function is called

        event.preventDefault();
        // post form data to backend
        let formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('background_info', info);
        formData.append('topic', selectedTopic);
        formData.append('classification', selectedClassification);
        formData.append('pdf_file', file);
        formData.append('cover_image', coverImage);
        formData.append('year', year);

        API.post('/library/books/upload_book/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, timeout: 150000,
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

    useEffect(() => {
        API.get("/library/books/get_classifications/")
            .then((response) => {
                setClassifications(response.data)
            })
    }, [])

    return (
        <Grid container
              style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
              }}
        >
            <>
                <Box sx={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    overflow: "auto",
                }}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={title}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Author"
                                    name="author"
                                    value={author}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Category"
                                    name="category"
                                    value={selectedCategory}
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
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Classification"
                                    name="classification"
                                    value={selectedClassification}
                                    onChange={(event) => setSelectedClassification(event.target.value)}
                                    fullWidth
                                    required
                                >
                                    {classifications.map((classification) => (
                                        <MenuItem key={classification} value={classification}>
                                            {classification}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" gutterBottom>
                                    Upload Book
                                </Typography>
                                <input type="file"
                                       accept=".pdf"
                                       onChange={(event) =>
                                           setFile(event.target.files[0])}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" gutterBottom>
                                    Book Cover
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        setCoverImage(event.target.files[0])}/>
                            </Grid>
                            <Grid item xs={6}>
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
                            <Grid item container spacing={2} direction={"column"} xs={6}>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Year of Publication"
                                        name="year"
                                        type={"number"}
                                        value={year}
                                        onChange={(event) => setYear(event.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button type="submit" variant="contained" fullWidth
                                            onClick={(event) => {
                                                event.preventDefault();
                                                uploadBook(event, title, year, author, file, coverImage, backgroundInfo, selectedCategory, selectedClassification)
                                            }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </>
            <Grid container
                  direction="column"
                  style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '10px',
                      width: '90%',
                      marginTop: '10px',
                  }}
            >
                {isAdmin ?
                    <>
                        <Typography variant={"h4"}>Requests</Typography>
                        <TableContainer component={Paper}>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Author</TableCell>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Requested by</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.length > 0 ? books.map((book) => (
                                        <TableRow key={book.id}>
                                            <TableCell>{book.name}</TableCell>
                                            <TableCell>{book.author}</TableCell>
                                            <TableCell>{book.year}</TableCell>
                                            <TableCell>{book.user}</TableCell>
                                        </TableRow>
                                    )) : null}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </>
                    : null}
            </Grid>
        </Grid>
    );
};

export default UploadBook;
