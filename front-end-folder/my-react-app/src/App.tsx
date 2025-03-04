// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import LoginForm from './components/auth/LoginForm';
import DoctorCRUD from './components/admin/DoctorCRUD';
import PrivateRoute from './components/common/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={['admin']}>
                <DoctorCRUD />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};