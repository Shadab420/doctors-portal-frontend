import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Button, Paper, Typography, CircularProgress } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  
  function createData(token, patientName, department, time) {
    return { token, patientName, department, time};
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


const styles = {
    page:{
        background: '#a5a5f9',
        minHeight: '100vh'
    },

    title:{
        paddingTop: 50,
    },

    datepicker: {
        marginTop: 50,
        marginBottom: 50
    },

    hr: {
        border: '3px solid #887f7f',
        margin: '30px 5%',
        width: '90%'
    },
    paper:{
        marginTop: 50,
        width: '80%',
        marginLeft: '10%'
    },

    appointPaper:{
        marginTop: 50,
        minHeight: 500,
        width: '90%',
        marginLeft: '5%',
        padding: 10
    },

    loading: {
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 50
    },

}

const DoctorAppointments = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [dateChanged, setDateChanged] = useState(false);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [progress, setProgress] = React.useState(0);
    const [appointments, setAppointments] = useState([]);
    // useEffect(() => {
    //     //get all schedules
    //     fetch('https://doctors-portal-back.herokuapp.com/appointments')
    //         .then(res => res.json())
    //         .then(data => {
    //             setSchedules(data);
    //             setLoadingSchedules(false);
    //         })
    //         .catch(err => console.log(err));
    // })

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setDateChanged(!dateChanged);
        console.log(getFormatedDate(date));

        setLoadingAppointments(true);

        fetch(`https://doctors-portal-back.herokuapp.com/appointments/${getFormatedDate(date)}`)
            .then(res => res.json())
            .then(data => {
                setAppointments(data);
                console.log(data)
                setLoadingAppointments(false);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetch(`https://doctors-portal-back.herokuapp.com/appointments/${getFormatedDate(selectedDate)}`)
            .then(res => res.json())
            .then(data => {
                setAppointments(data);
                console.log(data)
                setLoadingAppointments(false);
            })
            .catch(err => console.log(err));
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
      }, [loadingAppointments]);


    const getFormatedDate = (date) => {

        const datee = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();

        return `${(datee < 10 ? '0' : '') + datee}-${(date.getMonth()+1 < 10 ? '0' : '') + month }-${year}`;
    }

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="xl" style={styles.page}>
                <Grid container spacing={3}>
                    <Grid md={5} xs={12}>
                        <Paper elevation={3} style={styles.paper}>
                        <Typography variant="h5" style={styles.title}>Select a date to get all the appointments on that date.</Typography>
                        <hr style={styles.hr}/>
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
                        </Paper>
                    </Grid>

                    <Grid md={7} xs={12}>
                        <Paper elevation={3} style={styles.appointPaper}>
                            <Typography variant="h5" style={styles.title}>show apps based on date</Typography>
                            <hr style={styles.hr}/>

                            <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell>Patient Token</StyledTableCell>
                                    <StyledTableCell align="right">Patient Name</StyledTableCell>
                                    <StyledTableCell align="right">Phone</StyledTableCell>
                                    <StyledTableCell align="right">Department</StyledTableCell>
                                    <StyledTableCell align="right">Time</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                { !loadingAppointments && appointments.map((appointment, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {appointment.patientToken}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{appointment.name}</StyledTableCell>
                                    <StyledTableCell align="right">{appointment.phone}</StyledTableCell>
                                    <StyledTableCell align="right">{appointment.schedule.department}</StyledTableCell>
                                    <StyledTableCell align="right">{appointment.schedule.time}</StyledTableCell>
                                    <StyledTableCell align="right"><Button variant="contained" color="secondary">Not Visited</Button></StyledTableCell>
                                    </StyledTableRow>
                                ))
                                }

                                { 
                                    loadingAppointments && <Grid container justify="space-around">
                                        <Typography variant="h5" style={styles.loading}>Loading <CircularProgress variant="determinate" value={progress} color="secondary" style={styles.loadingCircle} /></Typography>
                                    </Grid> 
                                }  

                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>

                                
                
                
            </Container>
        </div>
    );
};

export default DoctorAppointments;