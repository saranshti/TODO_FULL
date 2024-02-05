import './App.css';

import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const info = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(info));

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
