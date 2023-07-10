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
        <Grid container direction={"row"}>
            <div>
                <Typography variant={"h5"}>My Books</Typography>
                <Typography variant={"h4"}
                            style={{
                                color:"#002060"
                            }}
                >My Collection</Typography>
            </div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <Card style={{
                            borderRadius: 10,
                        }}>
                            <CardMedia
                                component="img"
                                alt={book.title}
                                height="200"
                                image={book.cover_image}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
