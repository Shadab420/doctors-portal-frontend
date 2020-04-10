import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Button, Paper, Typography, CircularProgress } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Schedule from '../Schedule/Schedule';


const styles = {
    page:{
        background: '#cce9f1',
        minHeight: '100vh'
    },

    title:{
        paddingTop: 50,
    },

    datepicker: {
        marginTop: 50, 
    },

    img:{
        height: '70%',
        width: '90%',
        marginTop: 50
    },

    appointmentDate: {
        background: 'yellow',
        borderRadius: 5,
        padding: '0 10px'
    },

    loading: {
        fontWeight: 'bold',
        marginTop: 50
    },

    loadingCircle:{
         
    },

    hr: {
        border: '3px solid #887f7f',
        margin: 50
    }
}

const Appointment = () => {

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [schedules, setSchedules] = useState([])
    const [doctors, setDoctors] = React.useState([]);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [progress, setProgress] = React.useState(0);
    const [loadingSchedules, setLoadingSchedules] = useState(true);
    const [dateChanged, setDateChanged] = useState(false);
    
    useEffect(() => {
        //get all schedules
        fetch('https://doctors-portal-back.herokuapp.com/schedules')
            .then(res => res.json())
            .then(data => {
                setSchedules(data);
                setLoadingSchedules(false);
            })
            .catch(err => console.log(err));

        //get all doctors
        fetch('https://doctors-portal-back.herokuapp.com/doctors')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        function tick() {
          // reset when reaching 100%
          setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }
    
        const timer = setInterval(tick, 20);
        return () => {
          clearInterval(timer);
        };
      }, [loadingSchedules]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setAppointmentDate(date);
        setDateChanged(!dateChanged);
    };

    const getFormatedDate = (date) => {

        const datee = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();

        return `${(datee < 10 ? '0' : '') + datee}-${(date.getMonth()+1 < 10 ? '0' : '') + month }-${year}`;
    }

    const getFormattedDate2 = (date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
    }


    return (
        <div>
            <CssBaseline />
            <Container maxWidth="xl" style={styles.page}>
                <Grid container spacing={3}>
                    <Grid md={6} xs={12}>
                        <Typography variant="h2" style={styles.title}>Appointment</Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around" align="center">
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Select Appointment Date"
                                    format="dd-MM-yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style = {styles.datepicker}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid md={6} xs={12}>
                        <img src={require('../../images/Mask Group 1.png')} style={styles.img} />
                    </Grid>
                </Grid>

                <hr style={styles.hr} />
                
                <Typography variant="h3">Available appointments on <span style={styles.appointmentDate}>{ getFormattedDate2(appointmentDate) }</span></Typography>
                
                <Grid container spacing={3}>
                    {
                        !loadingSchedules && schedules.map(schedule =>{
                          return (
                            <Grid md={4} xs={12}>
                                {
                                    dateChanged && <Schedule schedule={{
                                    ...schedule, 
                                    appointmentDate: appointmentDate
                                    }} 
                                    doctors={doctors} />
                                }
                                {
                                    !dateChanged && <Schedule schedule={{
                                        ...schedule, 
                                        appointmentDate: appointmentDate
                                        }} 
                                        doctors={doctors} />
                                }
                            </Grid>
                          )
                        })
                    }

                    {
                        loadingSchedules && <Grid container justify="space-around">
                            <Typography variant="h5" style={styles.loading}>Loading <CircularProgress variant="determinate" value={progress} color="secondary" style={styles.loadingCircle} /></Typography>
                        </Grid> 
                    }
                </Grid>
                
                
                
            </Container>
        </div>
    );
};

export default Appointment;