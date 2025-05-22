import { useAuth } from 'fastapi-rtk';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainFrame from './common/Base/MainFrame';
import { routes, security } from './constants';
import LoginPage from './features/auth/user/LoginPage';

const loginPath = '/login';

function Wrapper() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (loading) return;

  if (isAdminRoute && !user) {
    return <Navigate to={loginPath} />;
  }

  return <MainFrame showNavbar={true} />;
}

function App() {
  console.log(window.fab_react_config);
  return (
    <Routes>
      <Route exact={true} path={loginPath} element={<LoginPage />} />
      <Route path="/" element={<Wrapper />}>
        {Object.values({
          ...routes,
          ...security,
        }).map((route) => (
          <Route key={route.path} path={route.path} element={<route.Element resource_name={route.resource_name} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
