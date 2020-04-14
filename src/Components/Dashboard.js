import React, { Component, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    AppBar,
    Avatar,
    Typography,
    IconButton,
    Button,
    Toolbar,
    Paper,
    Container,
    useMediaQuery,
    Card,
    CardHeader
} from '@material-ui/core';
import { AppBarCustom } from './Appbar';
import MenuIcon from '@material-ui/icons/Menu';
import { FormDialog } from './newTask';
import { Redirect, useHistory } from "react-router-dom";
import ReactMinimalPieChart from 'react-minimal-pie-chart';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    gridRoot: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    noTaskMobile: {
        width: '30%',
        // height: '20%',
        // width:
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: theme.spacing(2),
            // backgroundColor: theme.palette.primary.main,
        },
        marginTop: theme.spacing(10),
        margin: 'auto'
    },
    rootMobile: {
        padding: '5% 5% 5% 5%',
        [theme.breakpoints.down('sm')]: {
            // width:'100%',
            padding: '10% 10% 10% 10%',
        },

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        // height: 140,
        // width: ,
        margin: 4
    },
}));

const path = localStorage.getItem('image');
const name = localStorage.getItem('name')
const Dashboard = () => {
    const [completedTask, setCompletedTask] = React.useState(0);
    const [totalTask, setTotalTask] = React.useState(0);
    const [latestTaskArr, setLatestTaskArr] = React.useState([]);
    const [dialog, setDialog] = React.useState(false);
    const [spacing, setSpacing] = React.useState(2);
    const token = document.cookie;
    React.useEffect(async () => {
        await fetch('https://dev.teledirectasia.com:3092/dashboard', {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `${token.split('=')[1]}` },
        }).then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
                setCompletedTask(data.tasksCompleted)
                setTotalTask(data.totalTasks)
                setLatestTaskArr(data.latestTasks)
                console.log(completedTask, totalTask, latestTaskArr)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [])
    const openModal = (e) => {
        setDialog(true)
    }
    const handleClose = async (e) => {
        console.log(e)
        await fetch('https://dev.teledirectasia.com:3092/tasks', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `${token.split('=')[1]}` },
            body: JSON.stringify({ name: e })
        }).then((res) => res.json())
            .then(async (data) => {
                await fetch('https://dev.teledirectasia.com:3092/tasks', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `${token.split('=')[1]}` },
                }).then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                    })
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        setDialog(false)
    }
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    if (!token) return <Redirect to="/" />

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBarCustom name={name} path={path} />
                {(totalTask) ?
                    <div className={classes.gridRoot}>
                        <Grid container >
                            <Grid item sm>
                                <Paper className={classes.paper}>
                                    <Typography variant="h6" align='left'>
                                        Tasks Completed
                                    </Typography>
                                    <Typography align='left'>
                                        <Typography variant="h2" align='left' color='primary' display='inline'>
                                            {completedTask}
                                        </Typography>
                                        <Typography variant="h5" align='left' display='inline'>
                                            /
                                        </Typography>
                                        <Typography align='left' display='inline'>
                                            {totalTask}
                                        </Typography>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item sm>
                                <Paper className={classes.paper}>
                                    <Typography variant="h6" align='left'>
                                        Latest Created Task
                                    </Typography>
                                    <Typography>
                                        <ul>
                                            {latestTaskArr.map(latestTask => <li align='left' key={latestTask._id}>{(latestTask.completed) ? <del>{latestTask.name}</del> : latestTask.name}</li>)}
                                        </ul>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item sm>
                                <Paper className={classes.paper}>
                                    {/* <PieChart
                                        data={[
                                            { title: 'Two', value: 75, color: '#c1c1c1' },
                                            { title: 'One', value: 25, color: '#1976d2' },
                                            // { title: 'Three', value: 20, color: '#6A2135' },
                                        ]}
                                    /> */}
                                    <ReactMinimalPieChart
                                        animate={false}
                                        animationDuration={500}
                                        animationEasing="ease-out"
                                        cx={50}
                                        cy={50}
                                        data={[
                                            {
                                                color: '#c1c1c1',
                                                title: 'One',
                                                value: 75
                                            },
                                            {
                                                color: '#1976d2',
                                                title: 'Two',
                                                value: 25
                                            }
                                        ]}
                                        label={true}
                                        labelPosition={112}
                                        labelStyle={{
                                            fontFamily: 'sans-serif',
                                            fontSize: '15px'
                                        }}
                                        // labelPosition={50}
                                        lengthAngle={360}
                                        lineWidth={100}
                                        paddingAngle={0}
                                        radius={50}
                                        rounded={false}
                                        startAngle={0}
                                        style={{
                                            height: '150px'
                                        }}
                                        viewBoxSize={[
                                            100,
                                            100
                                        ]}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    <div className={classes.noTaskMobile}>
                        <FormDialog open={dialog} handleClose={handleClose} />
                        <Paper classes={{ root: classes.rootMobile }} >
                            <p align='center'>
                                You have no task.
                                </p>
                            <div align='center'>
                                <Button color='primary' variant='contained' onClick={(e) => openModal(e)}> + New Task </Button>
                            </div>
                        </Paper>
                    </div>
                }
            </div>
        </React.Fragment >
    );
}
export default Dashboard;