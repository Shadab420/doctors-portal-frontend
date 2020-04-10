import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Grid, Button, Paper, Typography, CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Prescription from '../Prescription/Prescription';
import PrescriptionView from '../Prescription/PrescriptionView';


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


const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const styles = {
    page:{
        background: '#f3d4d4',
        minHeight: '100vh'
    },

    title:{
        paddingTop: 50,
    },

    hr: {
        border: '3px solid #887f7f',
        margin: '30px 5%',
        width: '90%'
    },

    loading: {
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 50
    },

    countingDivs: {
        width: '40%',
        height: 100,
        marginLeft: '30%',
        margin: '50px 30%',
        display: 'flex',
        background: 'blue',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        borderRadius: 20,

        span:{
            marginRight: 10
        }
    },

}


const Prescriptions = (props) => {
    const classes = useStyles();
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(true);
    const [progress, setProgress] = React.useState(0);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        fetch('https://doctors-portal-back.herokuapp.com/prescriptions')
            .then(res => res.json())
            .then(data => {
                setPrescriptions(data);
                console.log(data)
                setLoadingPrescriptions(false);
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
      }, [loadingPrescriptions]);

    return (
        <div>

            <Container maxWidth="xl" style={styles.page}>
                <Typography variant="h2">Prescriptions</Typography>
                <hr style={styles.hr} />

                <Grid container spacing={3}>
                <Grid md={12} xs={12}>
                        <Paper elevation={3} style={styles.appointPaper}>

                            <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell>Patient Token</StyledTableCell>
                                    <StyledTableCell align="right">Patient Name</StyledTableCell>
                                    <StyledTableCell align="right">Phone</StyledTableCell>
                                    <StyledTableCell align="right">Department</StyledTableCell>
                                    <StyledTableCell align="right">Appointment Date</StyledTableCell>
                                    <StyledTableCell align="right">See Prescription</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                { !loadingPrescriptions && prescriptions.map((prescription, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {prescription.patientToken}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{prescription.name}</StyledTableCell>
                                    <StyledTableCell align="right">{prescription.phone}</StyledTableCell>
                                    <StyledTableCell align="right">{prescription.department}</StyledTableCell>
                                    <StyledTableCell align="right">{prescription.appdate}</StyledTableCell>
                                    <StyledTableCell align="right"><PrescriptionView prescription={prescriptions[index]} /></StyledTableCell>
                                    </StyledTableRow>
                                ))
                                }

                                { 
                                    loadingPrescriptions && <Grid container justify="space-around">
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

export default Prescriptions;