import React, { Component, useEffect, useState } from "react";
import {
    Container,
    makeStyles,
    Paper,
    TextField,
    Button,
    Typography,
    CssBaseline
} from '@material-ui/core';
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
    },
    root: {
        paddingTop: "15%",
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        },
        borderRadius: 10,
        margin: '2% auto'
    },
    input: {
        padding: 10
    },
    loginButton: {
        borderRadius: 10,
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(1),
    },
    typo:{
        paddingBottom: "5%"
    }
}));


const Login = (Props) => {
    const history = useHistory()
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [loader, setLoader] = useState(false)

    const onChangeHandler = (ev) => {
        (ev.target.name == 'name') ? setName(ev.target.value) : setId(ev.target.value)
    }

    const login = async () => {

        let obj = {
            name,
            apiKey: id
        }
        console.log(JSON.stringify(obj))
        await fetch("https://dev.teledirectasia.com:3092/login", {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
                localStorage.setItem("image", data.image)
                localStorage.setItem("name", data.token.name)
                history.push("./dashboard")
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    const classes = useStyles();

    if (token) return <Redirect to="/dashboard" />;
    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            <Paper elevation={3} className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Typography variant='h5' color='textSecondary' align='left' className={classes.typo}>Login</Typography>
                    <TextField
                        variant='filled'
                        type='text'
                        name='id'
                        placeholder="ID"
                        InputProps={{ classes: { root: classes.underline, input: classes.input } }}
                        fullWidth
                        required
                        onChange={(ev) => onChangeHandler(ev)}
                    />
                    <TextField
                        variant='filled'
                        type='text'
                        name='name'
                        placeholder="Name"
                        InputProps={{ classes: { root: classes.underline, input: classes.input } }}
                        fullWidth
                        required
                        onChange={(ev) => onChangeHandler(ev)}
                    />
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth
                        className={classes.loginButton}
                        onClick={() => login()}>
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );

}
export default Login;