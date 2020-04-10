import React, { useEffect } from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, Select, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
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
        marginTop: 20
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

const Schedule = (props) => {
    let { schedule, doctors } = props
    let [selectedDate, setSelectedDate] = React.useState(schedule.appointmentDate);
    let [doctorId, setDoctorId] = React.useState('');
    let [patientToken, setPatientToken] = React.useState(0);
    let [applySuccessful, setApplySuccessful] = React.useState(false);
    let [applyFailed, setApplyFailed] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, watch, errors, reset  } = useForm();
 
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setApplySuccessful(false);
        setApplyFailed(false);
      };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getFormatedDate = (date) => {

        const datee = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();

        return `${(datee < 10 ? '0' : '') + datee}-${(date.getMonth()+1 < 10 ? '0' : '') + month }-${year}`;
    }

    function randomToken(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }

    const onSubmit = (data, e) => {
        
        const patToken = randomToken(1,100);
        setPatientToken(patToken);

       const appointment = {
           ...data,
           schedule: {...schedule},
           appointmentDate: getFormatedDate(selectedDate),
           patientToken: patToken,
           pending: true,
           prescription: false
        }
        

        fetch('https://doctors-portal-back.herokuapp.com/addAppointment', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                setApplySuccessful(true);
                e.target.reset(); //clear form
            })
            .catch(err => applyFailed(true))
        
    }

    const handleDoctorChange = (event) => {
        const doctor = event.target.name;
        setDoctorId(event.target.value);
    }


    return (
        <div>
            <Paper style={styles.paper} elevation={3}>
                <Typography variant="h4">
                    { schedule.department }
                </Typography>

                <Typography variant="h5">
                    { schedule.time }
                </Typography>

                <Typography variant="h6">
                    { `${schedule.spaceAvailable} spaces available.` }
                </Typography>

                <Button style={styles.appoinmentBtn} onClick={handleClickOpen}>Book Appointment</Button>
            </Paper>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{schedule.department}</DialogTitle>
                { applySuccessful && <Typography variant="h6" style={styles.successMsg}>{`Application successful! Please Remember your token number is: ${patientToken}`}</Typography>}
                { applyFailed && <Typography variant="h6" style={styles.errorMsg}>{`Application submission failed! Please try again later.`}</Typography>}
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText>
                    Fill up the Appointment Form.
                </DialogContentText>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">Select a Doctor</InputLabel>
                    <Select
                    native
                    style={styles.doctorSelect}
                    value={doctorId}
                    onChange={handleDoctorChange}
                    label="Select a doctor"
                    autofocus
                    inputRef={register({ required: true })} 
                    error={errors.doctor? true : false}
                    inputProps={{
                        name: 'doctorId',
                        id: 'outlined-age-native-simple',
                    }}
                    >
                    <option aria-label="None" value="" />
                    {
                        doctors.map(doctor => <option value={doctor._id}>{doctor.name}</option>)
                    }
                   
                    </Select>
                    {errors.doctorId && <div>Please select a doctor</div>}
                </FormControl>
                

                <TextField
                    
                    margin="dense"
                    id="name"
                    name="name"
                    label="Your Name"
                    type="text"
                    inputRef={register({ required: true })}
                    error={errors.name? true : false}
                    fullWidth
                />
                {errors.name && <div >Name is required</div>}

                <TextField 
                    type="email" 
                    id="email" 
                    name="email" 
                    inputRef={register({ required: true })} 
                    label="Email" 
                    fullWidth
                    error={errors.email? true : false} />
                    {errors.email && <div >Email is required</div>}

                <TextField
                    
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Your Phone"
                    type="text"
                    inputRef={register({ required: true })}
                    error={errors.phone? true : false}
                    fullWidth
                />  
                {errors.phone && <div >Phone is required</div>}

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {/* <Grid container justify="space-around" align="center"> */}
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    name="datePicker"
                                    label="Select Appointment Date"
                                    format="dd-MM-yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style = {styles.datepicker}
                                />
                            {/* </Grid> */}
                </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" >
                    Get Appointment
                </Button>
                </DialogActions>
                </form>
            </Dialog>
            
        </div>
    );
};

export default Schedule;