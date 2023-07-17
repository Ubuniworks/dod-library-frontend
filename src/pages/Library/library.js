import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import React, {useEffect} from 'react';
import Api from "../../api/api";
import ReviewModal from "./components/ReviewModal";


export default function Dashboard() {
    const [books, setBooks] = React.useState([])
    const [categorizedBooks, setCategorizedBooks] = React.useState({})
    const [modalStatus, setModalStatus] = React.useState(false)
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
        setModalStatus(true);
    };


    return (
        <Grid container direction="row">
            <Grid item xs={12} style={{marginBottom: '20px'}}>
                <Typography variant="h5">Library</Typography>
                <Typography variant="h4" style={{color: '#002060'}}>
                    New Releases
                </Typography>
            </Grid>
            <Grid
                container
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
                        <Card style={{borderRadius: '10px'}}>
                            <CardMedia component="img" alt={book.title} height="200" image={book.cover_image}/>
                        </Card>
                        <CardContent>
                            <Typography variant="subtitle1">{book.title}</Typography>
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

            <Grid container direction="row" style={{marginTop: '20px'}}>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{color: '#002060'}}>
                        Topic
                    </Typography>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    style={{
                        backgroundColor: '#FFFFFF',
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        marginTop: '10px',
                    }}
                >
                    {Object.keys(categorizedBooks).map((category) => (
                        <Grid item key={category} xs={12}>
                            <Typography variant="h6" style={{marginBottom: '10px'}}>
                                {category}
                            </Typography>
                            <Grid container spacing={2}>
                                {categorizedBooks[category].map((book) => (
                                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            style={{ display: 'flex', borderRadius: '10px' }}
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
                                                    width: '50px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <CardContent style={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle1">{book.title}</Typography>
                                                <Typography variant="subtitle2">{book.author}</Typography>
                                            </CardContent>
                                        </Card>
                                        <ReviewModal
                                            book={modalBook}
                                            modalStatus={modalStatus}
                                            setModalStatus={setModalStatus}
                                        />
                                    </Grid>
                                ))}



                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

        </Grid>

    )
}
