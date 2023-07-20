import {Button, Card, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";
import React, {useEffect} from 'react';
import Api from "../../api/api";
import API from "../../api/api";
import ReviewModal from "./components/ReviewModal";
import ClassIcon from "@mui/icons-material/Class";
import RequestBookModal from "./components/RequestBookModal";


export default function Dashboard() {
    const [books, setBooks] = React.useState([])
    const [categorizedBooks, setCategorizedBooks] = React.useState({})
    const [categories, setCategories] = React.useState([]);
    const [modalStatus, setModalStatus] = React.useState(false)
    const [reviewModalStatus, setReviewModalStatus] = React.useState(false)
    const [modalBook, setModalBook] = React.useState({})

    useEffect(() => {
        Api.get("library/books/").then(
            response => {
                setBooks(response.data["results"])
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [])

    useEffect(() => {
        API.get("/library/categories/", {})
            .then((response) => {
                setCategories(response.data["results"])
            })
    }, [])

    useEffect(() => {
        Api.get("library/books/get_categorized_books/").then(
            response => {
                setCategorizedBooks(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [])

    const handleCardClick = (book) => {
        setModalBook(book);
        setReviewModalStatus(true);
    };


    return (
        <Grid container direction="row">
            <Grid
                item
                xs={8}
                direction={"column"}
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
                    <Grid item direction={"row"}
                          spacing={2}
                          key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            style={{
                                borderRadius: '10px',
                                display: 'flex',
                                margin: '5px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                // width: '500px',
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
                                <Typography variant="subtitle1">{book.title}</Typography>
                                {book.classification !== "Top Secret" ?
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
                                    : null}
                            </CardContent>
                        </Card>
                        <ReviewModal
                            book={modalBook}
                            reviewModalStatus={reviewModalStatus}
                            setReviewModalStatus={setReviewModalStatus}
                        />
                    </Grid>
                ))}
            </Grid>

            <Grid item direction="row" xs={4}>
                <Grid
                    item
                    spacing={2}
                    style={{
                        backgroundColor: '#FFFFFF',
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        margin: '5px',
                    }}
                >
                    <Typography variant={"h6"}>
                        Categories
                    </Typography>
                    <Grid item container xs={6} direction="row" alignItems="center" spacing={2}>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <Grid key={category.id} item>
                                    <Chip
                                        variant="outlined"
                                        color="info"
                                        label={category.name}
                                        icon={<ClassIcon/>}
                                        size="large"
                                        style={{fontSize: '20px'}} // Custom style to increase the font size
                                    />
                                </Grid>
                            ))
                        ) : (
                            <div>
                                <Typography variant={"h4"}>
                                    Categories are listed here
                                </Typography>
                            </div>
                        )}
                    </Grid>
                    <Grid item
                          direction="column"
                          style={{
                              backgroundColor: 'white',
                              borderRadius: '10px',
                              paddingTop: '10px',
                              marginLeft: '10px',
                              width: '96%',
                              marginBottom: '10px',
                          }}
                    >
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => {
                                setModalStatus(true)
                            }}
                        >
                            Request for Book
                        </Button>
                    </Grid>
                    <RequestBookModal modalStatus={modalStatus} setModalStatus={setModalStatus}/>
                </Grid>
            </Grid>

        </Grid>

    )
}
