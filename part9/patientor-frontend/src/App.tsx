import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';
import Notification from './components/Notification';

import { apiBaseUrl } from './constants';
import { Patient } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const setNotification = (notificationMessage: string) => {
    setNotificationMessage(notificationMessage);
    setTimeout(() => {setNotificationMessage('')}, 5000)
  }

  return (
    <div className='App'>
      <Router>
        <Container>
          <Notification notificationMessage={notificationMessage} />
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path='/'
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path='/patients/:id' element={<PatientPage setNotification={setNotification}/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
