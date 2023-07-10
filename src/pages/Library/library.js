import {Grid, Typography,  Card, CardMedia} from "@mui/material";
import React from 'react';
import {useEffect} from "react";
import Api from "../../api/api";


export default function Dashboard() {
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
        <Grid container direction="row" >
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
                <Typography variant="h5">Library</Typography>
                <Typography variant="h4" style={{ color: '#002060' }}>
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
                        <Card style={{ borderRadius: '10px' }}>
                            <CardMedia component="img" alt={book.title} height="200" image={book.cover_image} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>

    )
}
