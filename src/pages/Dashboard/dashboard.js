import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import React, {useEffect} from 'react';
import Api from "../../api/api";


export default function Dashboard() {
    const [books, setBooks] = React.useState([])
    useEffect(() => {
        Api.get("library/books/get_favourites/").then(
            response => {
                setBooks(response.data)
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
                                color: "#002060"
                            }}
                >My Collection</Typography>
            </div>
            <Grid container
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
                        <Card style={{
                            borderRadius: 10,
                        }}>
                            <CardMedia
                                component="img"
                                alt={book.title}
                                height="200"
                                width="100"
                                image={book.cover_image}
                            />
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
        </Grid>
    )
}
