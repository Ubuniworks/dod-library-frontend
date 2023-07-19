import React, {useEffect} from 'react';
import Api from "../../api/api";
import {Grid} from "@mui/material";

export default function Notices() {
    const [notices, setNotices] = React.useState([])
    useEffect(() => {
        Api.get("library/books/notices/").then(
            response => {
                setNotices(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [])
    return (
        <Grid container>
            <h1>Notices</h1>
        </Grid>
    );
}
