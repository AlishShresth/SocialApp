import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path='/login/' element={<Login />} />
      <Route path='/register' element={<Registration/>} />
    </Routes>
  )
}

export default App
