import React from 'react';
import CreateRecordForm from './Components/Form/CreateRecordForm';
import ReadOP from './Components/ReadOP/ReadOP';
import RegistrationForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';

import {BrowserRouter as Router,Routes,Route, } from 'react-router-dom';
import Error404 from './Components/Error Page/Error404';
import ProtectedRoute from './Components/Protected/ProtectedRoute';
import NewItem from './Components/newItem/newItem';
import ShowItems from './Components/ShowItems/ShowItems';
import ShowUserItems from './Components/ShowUserItems/ShowUserItems';
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
            <Route path="/addItem" element={ <NewItem/>} />
            <Route path="/showItem" element={ <ShowItems/>} />
            <Route path="/showUserItem" element={ <ShowUserItems/>} />
          </Route>
          
          
        </Routes>
    </Router>
      );
}

export default App;
