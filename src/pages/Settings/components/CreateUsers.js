import React from 'react'
import {Box, Button, Grid, Modal, TextField, Typography} from "@mui/material";
import Api from "../../../api/api";


export default function CreateUsers({open, setOpen}) {
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 10,
        width: "1050px",
        height: "500px"
    };

    async function CreateUser() {
        await Api.post('/auth/users/', {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "username": username,
            "password": password,
            "is_admin": isAdmin,
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                alert("User created successfully")
                setOpen(false)
                window.location.reload()

            }
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <Modal open={open}>
            <Box sx={style}>
                <Grid item>
                    <Typography variant={"h4"}>Create new user</Typography>
                </Grid>
                <Grid item>
                    {/*Row 1*/}
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant={"h6"}>First name</Typography>
                            <TextField type={"text"}
                                       style={{width: "100%"}}
                                       required={true}
                                       onChange={(e) => {
                                           setFirstName(e.target.value)
                                       }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant={"h6"}>Last name</Typography>
                            <TextField type={"text"}
                                       required={true}
                                       style={{width: "100%"}}
                                       onChange={(e) => {
                                           setLastName(e.target.value)
                                       }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {/*Row 2*/}
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant={"h6"}>Email</Typography>
                            <TextField type={"email"}
                                       required={true}
                                       style={{width: "100%"}}
                                       onChange={(e) => {
                                           setEmail(e.target.value)
                                       }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant={"h6"}>Username</Typography>
                            <TextField type={"text"}
                                       required={true}
                                       style={{width: "100%"}}
                                       onChange={(e) => {
                                           setUsername(e.target.value)
                                       }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                    {/*Row 3*/}
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>Password</Typography>
                            <TextField type={"text"}
                                       style={{width: "100%"}}
                                       onChange={(e) => {
                                           setPassword(e.target.value)
                                       }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} spacing={2}>
                {/*        Check box for whether one is an admin or not*/}
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>Is Admin</Typography>
                            <TextField type={"checkbox"}
                                       value={isAdmin}
                                        onChange={(e) => {
                                            setIsAdmin(e.target.value)
                                        }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    {/*Save and cancel buttons*/}
                    <Grid container direction={"row"} spacing={2}
                          justifyItems={"center"}
                          justifyContent={"center"}
                          style={{marginTop: "10px"}}
                    >
                        <Grid item>
                            <Button
                                style={{
                                    backgroundColor: "#002060",
                                    borderRadius: 10,
                                    color: "white",
                                    alignItems: "center"
                                }}
                                onClick={() => {
                                    CreateUser()
                                }}
                            >Save</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{
                                    backgroundColor: "#3E3E65C2",
                                    borderRadius: 10,
                                    color: "white",
                                    alignItems: "center"
                                }}
                                onClick={() => setOpen(false)}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
