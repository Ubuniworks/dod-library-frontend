import React from "react";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Modal, TextField, Typography} from "@mui/material";
import Api from "../../../api/api";


export default function ViewEditUser({open, setOpen, user}) {
    const [firstName, setFirstName] = React.useState(String(user.first_name));
    const [lastName, setLastName] = React.useState(String(user.last_name));
    const [email, setEmail] = React.useState(String(user.email));
    const [isAdmin, setIsAdmin] = React.useState(false);

    function editUser(firstName, lastName, email, isAdmin) {
        let data = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "id": user.id,
            "is_admin": isAdmin
        }
        Api.patch('auth/users/update_user/', data).then((response) => {
            if (response.status === 200 || response.status === 201) {
                alert("User updated successfully")
                setOpen(false)
                window.location.reload()
            }
        }
        ).catch((error) => {
            console.log(error)
        }
        )
    }

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


    return (
        <Modal open={open}>
            <Box sx={style}>
                <Grid item>
                    <Typography variant={"h4"}>Edit user</Typography>
                </Grid>
                <Grid item>
                    {/*Row 1*/}
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant={"h6"}>First name</Typography>
                            <TextField type={"text"}
                                       defaultValue={user.first_name}
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
                                       defaultValue={user.last_name}
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
                </Grid>
                <Grid item>
                    {/*Row 3*/}
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant={"h6"}>Email</Typography>
                            <TextField type={"text"}
                                       required={true}
                                       defaultValue={user.email}
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
                                       defaultValue={user.username}
                                       contentEditable={false}
                                       disabled={true}
                                       style={{width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={isAdmin} value={isAdmin} onChange={(event) => {

                                    setIsAdmin(event.target.checked)
                                }}
                                />}
                                label="Is Admin"/>
                        </FormGroup>
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
                                    editUser(firstName, lastName, email, isAdmin)
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
