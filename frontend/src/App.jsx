import React from 'react';
import CreateRecordForm from './Components/Form/CreateRecordForm';
import ReadOP from './Components/ReadOP/ReadOP';
import RegistrationForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';

import {BrowserRouter as Router,Routes,Route, } from 'react-router-dom';
import Error404 from './Components/Error Page/Error404';
import ProtectedRoute from './Components/Protected/ProtectedRoute';
function App() {
    return (
      <Router>
        
        <Routes>
          <Route path="/" element={<ReadOP />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="*" element={<Error404 />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<CreateRecordForm />} />
          </Route>
          
          
        </Routes>
    </Router>
      );
}

export default App;
