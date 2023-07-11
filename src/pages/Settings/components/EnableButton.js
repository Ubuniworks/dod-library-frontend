import {Button} from "@mui/material";
import React from "react";
import API from "../../../api/api";


function enableStaff(id: string) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to enable this staff member's access to your institution?")) {
        API.put("/staff/enable_staff_access/", {
            user: id,
        })
            .then((response) => {
                alert("Staff access enabled");
                window.location.reload();
            });
    }
}

export default function EnableButton({user}) {
    return (
        <Button
            variant={"outlined"}
            color={"secondary"}
            size={"small"}
            onClick={() => {
                enableStaff(user.user)
            }}
        >Enable</Button>
    )
}
