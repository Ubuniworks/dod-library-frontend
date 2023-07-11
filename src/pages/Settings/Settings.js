import React, {useEffect, useState} from "react"
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
import DisableButton from "./components/DisableButton";
import EnableButton from "./components/EnableButton";
import CreateUsers from "./components/CreateUsers";
import ViewEditUser from "./components/ViewEditUser";
import AddBookModal from "./components/UploadBook";

export default function Settings() {
    const [users, setUsers] = React.useState([]);
    const [openEdit, setOpenEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [bookOpen, setBookOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState({});

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
                          marginBottom: '10px',
                      }}
                >
                    <Typography variant={"h4"}>Upload Book</Typography>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => {
                            setBookOpen(true)
                        }}
                    >
                        Upload Book
                    </Button>
                    <AddBookModal open={bookOpen} />
                </Grid>

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
                        <Button variant={"contained"} color={"primary"}
                                onClick={() => {
                                    setOpen(true)
                                }}
                        >
                            Create new user
                        </Button>

                        <CreateUsers open={open} setOpen={setOpen}/>

                    </Grid>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Status</TableCell>
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
                                        <TableCell>{user.is_active ? "Active" : "Disabled"}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        <TableCell>
                                            <Grid
                                                container
                                                direction={"row"}
                                                justifyContent={"space-around"}>
                                                <Grid item>
                                                    <Button
                                                        variant={"outlined"}
                                                        color={"primary"}
                                                        size={"small"}
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setOpenEdit(true)
                                                        }}
                                                    >Edit</Button>
                                                    <ViewEditUser open={openEdit} setOpen={setOpenEdit}
                                                                  user={selectedUser}/>
                                                </Grid>
                                                <Grid item>
                                                    {user.is_active === false ?
                                                        (<EnableButton user={user}/>) :
                                                        (<DisableButton user={user}/>)
                                                    }
                                                </Grid>
                                            </Grid>
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
