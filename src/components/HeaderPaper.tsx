import { Button, Paper, Typography } from "@mui/material";
import React from "react";

export default function HeaderPaper(
    { setOpenTemplate }: { setOpenTemplate: (open: boolean) => void }
) {
    return (
        <Paper sx={{ minHeight: 200, p: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>Config UI</Typography>
            <Typography variant="body1" gutterBottom>
                This is a web application to allow users to create config file by interacting with User Interface.
                <br></br>
                Click the below button below to setup a template for generating the UI!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenTemplate(true)}
            >Open Editor</Button>
        </Paper>
    )
}