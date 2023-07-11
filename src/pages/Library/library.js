import {Card, CardMedia, CardContent, Grid, Typography} from "@mui/material";
import React, {useEffect} from 'react';
import Api from "../../api/api";


export default function Dashboard() {
    const [books, setBooks] = React.useState([])
    const [categorizedBooks, setCategorizedBooks] = React.useState({})

    // get API url from .env file
    const API_URL = process.env.REACT_APP_API_URL
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
                console.log(response.data)
                setCategorizedBooks(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [])
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
                                        <Card style={{display: "flex", borderRadius: '10px'}}>
                                            <CardMedia
                                                component="img"
                                                alt={book.title}
                                                height="100"
                                                image={book.cover_image}
                                                style={{
                                                    width: "50px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <CardContent style={{flexGrow: 1}}>
                                                <Typography variant="subtitle1">{book.title}</Typography>
                                                <Typography variant="subtitle2">{book.author}</Typography>
                                            </CardContent>

                                        </Card>
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
