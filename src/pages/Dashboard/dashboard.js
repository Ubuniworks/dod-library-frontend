import {Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import Api from "../../api/api";


export default function Dashboard() {
    useEffect(() => {
        Api.get("library/books/").then(
            response => {
                console.log(response.data["results"])
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [])
    return (
        <Grid container>
            <div>
                <Typography variant={"h5"}>My Books</Typography>
                <Typography variant={"h4"}
                            style={{
                                color:"#002060"
                            }}
                >My Collection</Typography>
            </div>
        </Grid>
    )
}
