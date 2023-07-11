import React, {useEffect} from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Api from "../../api/api";

export default function Search() {
    const [books, setBooks] = React.useState([])

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

    return (
        <Grid container direction="row">
            <Grid item xs={12} style={{marginBottom: '20px'}}>
                <Typography variant="h4" style={{color: '#002060'}}>
                    Results
                </Typography>
                <Typography variant="h5">By Title</Typography>
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

            <Grid></Grid>
        </Grid>
    );
}
