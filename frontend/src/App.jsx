import { useAuth } from 'fastapi-rtk';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MainFrame from './common/Base/MainFrame';
import { routes, security } from './constants';
import LoginPage from './features/auth/user/LoginPage';

const loginPath = '/login';

function Wrapper() {
  const { user, loading } = useAuth();

  if (!user && loading) return;
  return user ? <MainFrame /> : <Navigate to={loginPath} />;
}

function App() {
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
