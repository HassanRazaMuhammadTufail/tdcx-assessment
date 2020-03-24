import React, { Component, useEffect, useState } from "react";
import { Container, makeStyles, Paper, TextField, Button, Typography } from '@material-ui/core';
import { Redirect,Route,Link,useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "5%",
        margin: 'auto',
        // width: '30%'
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        },
        borderRadius: 20,
        width: '80%',
        margin: '2% auto'
    },
    input: {
        padding: 10
    },
    loginButton: {
        borderRadius: 25,
        width: '80%',
        margin: '2% 10%',
        padding: '2%'
    },
    heading: {
        padding: '1% 10%'
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
        <React.Fragment>
            <Container fixed>
                <Paper elevation={3} className={classes.root}>
                    <div className={classes.heading}>
                        <Typography variant='h3' align='left'>Login</Typography>
                    </div>
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
                    <Button color='primary' variant='contained' className={classes.loginButton} onClick={() => login()}>Login</Button>
                </Paper>
            </Container>
        </React.Fragment>
    );

}
export default Login;