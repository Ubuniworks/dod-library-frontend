import {Button} from "@mui/material";
import React from "react";
import API from "../../../api/api";


function disableStaff(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to disable this user's access to your Library?")) {
        API.put("/auth/users/suspend_user_access/", {
            user: id,
        })
            .then((response) => {
                // console.log(response.data);
                alert("User access suspended");
                window.location.reload();
            });
    }
}


export default function DisableButton({user}) {
    return (
        <Button
            variant={"outlined"}
            color={"error"}
            size={"small"}
            onClick={() => {
                disableStaff(user.id)
            }}
        >Disable</Button>
    )
}
