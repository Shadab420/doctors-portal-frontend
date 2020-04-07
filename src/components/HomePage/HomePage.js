import React from 'react';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Button, Paper } from '@material-ui/core';

const styles = {
    paper: {
        height: '400px',
        width: '500px',
        margin: '15%',
        padding: '100px'

    },

    homeBtn: {
        height: 200,
        width: 300
    },

    page:{
        background: 'lightgray',
        height: '100vh'
    },

    link: {
        height: 200,
        width: 300,
        color: 'white',
        padding: '70px'
    }
}

const HomePage = () => {

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="xl" style={styles.page}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Button variant="contained" color="primary" size="large" style={styles.homeBtn}>
                                <Link to="/patient/appointment" style={styles.link}> Get Appointment</Link>
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Button variant="contained" color="secondary" size="large" style={styles.homeBtn}>
                                <Link to="/doctor/dashboard" style={styles.link}> Doctor</Link>
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default HomePage;