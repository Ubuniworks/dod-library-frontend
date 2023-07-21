import {Button, Card, CardContent, CardMedia, Grid, IconButton, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import SearchIcon from '@mui/icons-material/Search';
import ReviewModal from "../Library/components/ReviewModal";


export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [notices, setNotices] = useState([]);
    const [searchOption, setSearchOption] = useState('');
    const [results, setResults] = useState([]);
    const [modalBook, setModalBook] = React.useState({})
    const [reviewModalStatus, setReviewModalStatus] = React.useState(false)

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await Api.get('/library/notices/'); // Fetch the 10 most recent notices from the API
            setNotices(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchOptionChange = (option) => {
        setSearchOption(option);
    };

    const handleSearch = async () => {
        // Perform search with the entered search term
        if (searchTerm.trim() === '' || searchOption === '') {
            // Handle validation or display an error message
            alert('Please enter a search term and select a search option')
            return;
        }
        // You can make an API request here to fetch search results based on the search term
        let data = {
            "search_term": searchTerm,
            "search_option": searchOption
        }
        try {
            let response = await Api.post('/library/search/', data);
            if (response.data["results"].length === 0) {
                alert("No results found")
                return;
            }
            setResults(response.data["results"]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardClick = (book) => {
        setModalBook(book);
        setReviewModalStatus(true);
    };


    return (
        <Grid container direction="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
                Search Page
            </Typography>
            <Grid item>
                <TextField
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Enter search term"
                    variant="outlined"
                    required={true}
                    style={{
                        width: 500,
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleSearch}>
                                <SearchIcon/>
                            </IconButton>
                        ),
                    }}
                />

            </Grid>
            <Grid item container justifyContent="center"> {/* Updated line */}
                <Grid item>
                    <Typography style={{margin: "10px"}} variant="h6" gutterBottom>
                        Search By:
                    </Typography>
                </Grid>
                <Grid item>
                    <Button style={{margin: "10px"}} variant="contained"
                            onClick={() => handleSearchOptionChange('year')} disabled={searchOption === 'year'}>
                        Year
                    </Button>
                    <Button style={{margin: "10px"}} variant="contained"
                            onClick={() => handleSearchOptionChange('author')} disabled={searchOption === 'author'}>
                        Author
                    </Button>
                    <Button style={{margin: "10px"}} variant="contained"
                            onClick={() => handleSearchOptionChange('title')} disabled={searchOption === 'title'}>
                        Title
                    </Button>
                </Grid>
                <ReviewModal
                    book={modalBook}
                    reviewModalStatus={reviewModalStatus}
                    setReviewModalStatus={setReviewModalStatus}
                />
            </Grid>
            {results.length > 0 && (
                <Grid item>
                    <Typography variant="h6">Search Results:</Typography>
                    {/*<ul>*/}
                    {results.map((book) => (
                        <Card
                            style={{
                                borderRadius: '10px',
                                display: 'flex',
                                margin: '5px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                width: '500px',
                                height: '100px',
                            }}
                            onClick={() => {
                                handleCardClick(book);
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={book.title}
                                height="100"
                                image={book.cover_image_url}
                                style={{
                                    width: '70px',
                                    objectFit: 'cover',
                                }}

                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Title: {book.title}
                                </Typography>
                                <Typography>Author: {book.author}</Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    {book.year_of_publication}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            )}
            <Typography
                variant={"h5"}
                style={{
                    marginTop: '20px',
                }}
            >
                Notice Board
            </Typography>
            <Typography>
                Click on Card to view more
            </Typography>
            <Grid item>
                {notices.length > 0 ? notices.map((notice) => (
                    <Card
                        style={{
                            borderRadius: '10px',
                            display: 'flex',
                            margin: '5px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            width: '500px',
                        }}
                        onClick={() => {
                            handleCardClick(notice);
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt={notice.title}
                            height="100"
                            image={notice.cover_image_url}
                            style={{
                                width: '70px',
                                objectFit: 'cover',
                            }}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {notice.title}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {notice.year_of_publication}
                            </Typography>
                        </CardContent>
                    </Card>
                )) : <Typography variant={"h4"}>
                    There are no new notices
                </Typography>}
            </Grid>
        </Grid>
    )
}
