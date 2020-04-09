import React, { useEffect } from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
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
    }
}

const Schedule = (props) => {
    let { schedule } = props
    let [selectedDate, setSelectedDate] = React.useState(schedule.appointmentDate);
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, watch, errors, setValue  } = useForm();
 
    const handleClickOpen = () => {
        setOpen(true);
        console.log(schedule.appointmentDate);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getFormatedDate = (date) => {

        const datee = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();

        return `${(datee < 10 ? '0' : '') + datee}/${(date.getMonth()+1 < 10 ? '0' : '') + month }/${year}`;
    }

    const onSubmit = data => { console.log({...data, appointmentDate: getFormatedDate(selectedDate)}) }


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
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText>
                    Fill up the Appointment Form.
                </DialogContentText>

                
                <Autocomplete
                    id="doctor-combobox"
                    autofocus
                    options={props.doctors}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} name="doctor" inputRef={register({ required: true })} error={errors.doctor? true : false} label="Select a doctor" variant="outlined" />}
                />
                {errors.doctor && <div>Please select a doctor</div>}

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
                                    format="dd/MM/yyyy"
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
                    Subscribe
                </Button>
                </DialogActions>
                </form>
            </Dialog>
            
        </div>
    );
};

export default Schedule;