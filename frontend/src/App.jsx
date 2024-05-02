import React from 'react';
import CreateRecordForm from './Components/Form/CreateRecordForm';
import ReadOP from './Components/ReadOP/ReadOP';
import RegistrationForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from './Components/Error Page/Error404';
function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ReadOP />}/>
              {/* <Route index element={<Home />} /> */}
            <Route path="login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;
