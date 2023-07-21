import React, {useEffect} from "react"
import API from "../../api/api";
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

export default function Settings() {
    const [users, setUsers] = React.useState([]);


    const myId = localStorage.getItem('user_id');
    const isAdmin = localStorage.getItem('is_admin') === 'true';

    // ensure that logged-in user is admin
    if (isAdmin === false) {
        window.location.href = '/'
    }
    useEffect(() => {
        API.get("/auth/users/", {})
            .then((response) => {
                setUsers(response.data["results"])
            })
    }, [])
    return (
        <>
            <Grid container>

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
                    <Grid
                        item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}>
                        <Typography variant={"h4"}>User list</Typography>

                    </Grid>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Action</TableCell>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        id={user.id}
                                        hover
                                    >
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>
                                            {user.is_admin ? (
                                                myId !== user.id ? (
                                                    <Button
                                                        variant="outlined"
                                                        color="warning"
                                                        onClick={() => {
                                                            API.patch(`/auth/users/${user.id}/`, {
                                                                is_admin: false
                                                            })
                                                                .then((response) => {
                                                                    window.location.reload();
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error);
                                                                });
                                                        }}
                                                    >
                                                        Remove Admin
                                                    </Button>
                                                ) : null
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => {
                                                        API.patch(`/auth/users/${user.id}/`, {
                                                            is_admin: true
                                                        })
                                                            .then((response) => {
                                                                window.location.reload();
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                            });
                                                    }}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}

                                    </TableCell>
                                    </TableRow>

                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}
