import React, { Component, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Typography, IconButton, Button, Toolbar } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const AppBarCustom = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>


                <AppBar position="static" color='textSecondary'>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <Avatar src={props.path} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.name}
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
    );
}