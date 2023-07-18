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
import ViewLesson from "./components/ViewLesson";

export default function LessonsLearnt() {
    const [modalStatus, setModalStatus] = React.useState(false)
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const [lessons, setLessons] = React.useState([])
    const [viewLesson, setViewLesson] = React.useState(false)
    const [selectedLesson, setSelectedLesson] = React.useState({})

    useEffect(() => {
        Api.get("library/lessons/").then(
            response => {
                setLessons(response.data["results"])
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
                        <Typography variant={"h4"}>Uploaded Lessons</Typography>
                        <TableContainer component={Paper}>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tile</TableCell>
                                        <TableCell>Uploaded by</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lessons.length > 0 ? lessons.map((lesson) => (
                                        <TableRow key={lesson.id}>
                                            <TableCell>{lesson.title}</TableCell>
                                            <TableCell>{lesson.user}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={"contained"}
                                                    color={"primary"}
                                                    onClick={() => {
                                                        setSelectedLesson(lesson)
                                                        setViewLesson(true)
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )): null}
                                </TableBody>
                            </Table>
                            <ViewLesson open={viewLesson} setOpen={setViewLesson} lesson={selectedLesson}/>

                        </TableContainer>
                    </>
                    : null}
            </Grid>
        </Grid>
    )}
