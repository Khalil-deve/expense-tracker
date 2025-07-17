import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import Loader from './components/Loader';
import AuthPage from './components/layouts/AuthPage';
import NotFound from '../pages/NotFound';

// Lazy load pages
const Login = lazy(() => import('../pages/Auth/Login'));
const SignUp = lazy(() => import('../pages/Auth/SignUp'));
const Home = lazy(() => import('../pages/Dashboard/Home'));
const Income = lazy(() => import('../pages/Dashboard/Income'));
const Expense = lazy(() => import('../pages/Dashboard/Expense'));
const Root = lazy(() => import('./components/Root'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));



function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Protected Routes */}
          <Route path='/' element={<Root />}>
            <Route index element={<Home />} />
            <Route path='dashboard/income' element={<Income />} />
            <Route path='dashboard/expense' element={<Expense />} />
          </Route>

          {/* Public Routes */}
          <Route path='/login' element={<AuthPage />} />
          <Route path='/signup' element={<AuthPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
