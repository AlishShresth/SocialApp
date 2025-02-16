import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path='/login/' element={<div>Login</div>} />
    </Routes>
  )
}

export default App
