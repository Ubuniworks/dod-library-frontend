import React, {useEffect} from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Api from "../../api/api";
import UploadLesson from "./components/UploadLesson";

export default function LessonsLearnt() {
    const [modalStatus, setModalStatus] = React.useState(false)
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const [books, setBooks] = React.useState([])

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

    return (
        <Grid container>
            <Grid container
                  direction="column"
                  style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '10px',
                      marginLeft: '10px',
                      width: '96%',
                      marginBottom: '10px',
                  }}
            >
                <Typography variant={"h4"}>Lesson Learnt</Typography>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => {
                        setModalStatus(true)
                    }}
                >
                    Upload Lesson Learnt
                </Button>
            </Grid>
            <UploadLesson open={modalStatus} setOpen={setModalStatus}/>
            <Grid container
                  direction="column"
                  style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '10px',
                      marginLeft: '10px',
                      width: '96%',
                  }}
            >
                {isAdmin ?
                    <>
                        <Typography variant={"h4"}>Lessons Learnt</Typography>
                        <TableContainer component={Paper}>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tile</TableCell>
                                        <TableCell>Requested by</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.length > 0 ? books.map((book) => (
                                        <TableRow key={book.id}>
                                            <TableCell>{book.name}</TableCell>
                                            <TableCell>{book.user}</TableCell>
                                        </TableRow>
                                    )): null}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </>
                    : null}
            </Grid>
        </Grid>
    )}
