import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import OrderStatus from './pages/OrderStatus';
import OrderSuccess from './pages/OrderSuccess';
import OrderTest from './pages/OrderTest';
import TestPage from './pages/TestPage';
import DatabaseViewer from './pages/DatabaseViewer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/m/:slug" element={<MenuPage />} />
              <Route path="/order-status/:orderId" element={<OrderStatus />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />
              <Route path="/order-test" element={<OrderTest />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/database" element={<DatabaseViewer />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
