
// import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

// const newTask = () => {
//   return (
//     <div>
//       <FormDialog />
//     </div>
//   )
// }

// export default newTask;

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
          borderRadius: 10,
          borderBottom: "none"
      },
      "&&:after": {
          borderRadius: 10,
          borderBottom: "none"
      },
      borderRadius: 10,
      margin: '2% auto'
  },
  input: {
      padding: 10
  },
  Button: {
      borderRadius: 10,
      margin : 15,
      marginTop: 0
      // margin: theme.spacing(3, 0, 2),
  },
  form: {
      width: '80%',
      marginTop: theme.spacing(1),
  },
  typo:{
      paddingBottom: "5%"
  }
}));


export function FormDialog(props) {
  console.log(props)
  const [task, setTask] = React.useState('');

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = (e) => {
    console.log(e)
    // setOpen(false);

  };
  const classes = useStyles();
  return (
    <div>
      <Dialog open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> + New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            variant='filled'
            type='text'
            name='name'
            placeholder="Name"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            InputProps={{ classes: { root: classes.underline, input: classes.input } }}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            variant='contained'
            fullWidth
            onClick={()=>props.handleClose(task)}
            className={classes.Button}
          >
            + New Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}