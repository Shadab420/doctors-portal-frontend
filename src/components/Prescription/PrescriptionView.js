import React, { useEffect } from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, Select, InputLabel } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    paper: {
        minHeight: '300px',
        width: '90%',
        marginLeft: '5%',
        marginTop: 70,
        marginBottom: 10,
        padding: 30,
    },

    appoinmentBtn: {
        background: 'linear-gradient( to right, rgb(94, 218, 194), rgb(8, 178, 199))',
        color: 'white',
        padding: 10,
        marginTop: 10
    },

    successMsg: {
        background: 'green',
        color: 'white'
    },

    errorMsg: {
        background: 'red',
        color: 'white'
    },

    doctorSelect:{
        width: '100%'
    }

}

const PrescriptionView = (props) => {
    let { prescription } = props
    const [open, setOpen] = React.useState(false);
 
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    return (
        <div>

            <Button style={styles.appoinmentBtn} onClick={handleClickOpen}>Prescription</Button>
        

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{`Prescription for ${prescription.name}`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    { prescription.prescription}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleClose} color="primary">
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
};

export default PrescriptionView;