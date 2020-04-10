import React, { useEffect } from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, Select, InputLabel } from '@material-ui/core';
import { useForm } from 'react-hook-form';

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

const Prescription = (props) => {
    let { appointment } = props
    let [prescriptionSuccessful, setPrescriptionSuccessful] = React.useState(false);
    let [prescriptionFailed, setPrescriptionFailed] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, watch, errors, reset  } = useForm();
 
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setPrescriptionSuccessful(false);
        setPrescriptionFailed(false);
      };


    const onSubmit = (data, e) => {

        fetch('https://doctors-portal-back.herokuapp.com/addPrescription', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({...data, patientToken: appointment.patientToken})
        })
            .then(res => res.json())
            .then(data => {
                setPrescriptionSuccessful(true);
                e.target.reset(); //clear form
            })
            .catch(err => setPrescriptionFailed(true))
        
    }

    return (
        <div>

            <Button style={styles.appoinmentBtn} onClick={handleClickOpen}>Add Prescription</Button>
        

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{`Prescription for ${appointment.name}`}</DialogTitle>
                { prescriptionSuccessful && <Typography variant="h6" style={styles.successMsg}>{`Prescription added!`}</Typography>}
                { prescriptionFailed && <Typography variant="h6" style={styles.errorMsg}>{`An error occured! Please try again.`}</Typography>}
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>

                <TextField
                    
                    margin="dense"
                    id="name"
                    name="name"
                    label="Patient Name"
                    type="text"
                    value={appointment.name}
                    inputRef={register({ required: true })}
                    error={errors.name? true : false}
                    disabled
                    fullWidth
                />
                {errors.name && <div >Name is required</div>}

                <TextField
                    
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Patient Name"
                    type="text"
                    value={appointment.phone}
                    inputRef={register({ required: true })}
                    error={errors.phone? true : false}
                    disabled
                    fullWidth
                />
                {errors.phone && <div >Phone is required</div>}

                <TextField 
                    type="department" 
                    id="department" 
                    name="department" 
                    inputRef={register({ required: true })} 
                    label="Department" 
                    value={appointment.schedule.department}
                    fullWidth
                    disabled
                    error={errors.department? true : false} />
                    {errors.department && <div> Department is required </div>}

                <TextField
                    
                    margin="dense"
                    id="appdate"
                    name="appdate"
                    label="Appointment Date"
                    type="text"
                    inputRef={register({ required: true })}
                    error={errors.appdate? true : false}
                    value={appointment.appointmentDate}
                    fullWidth
                    disabled
                />  
                {errors.appdate && <div > Appointment date is required</div>}

                <TextField
                    
                    margin="dense"
                    id="prescription"
                    name="prescription"
                    label="Prescribe something"
                    type="text"
                    inputRef={register({ required: true })}
                    error={errors.prescription? true : false}
                    fullWidth
                
                />  
                {errors.prescription && <div > Prescription is required</div>}

                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" >
                    Add Prescription
                </Button>
                </DialogActions>
                </form>
            </Dialog>
            
        </div>
    );
};

export default Prescription;