import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { Songs } from '@/pages/Songs';
import { Playlists } from '@/pages/Playlists';
import { PlaylistDetail } from '@/pages/PlaylistDetail';
import Store from '@/store';
import NotFoundPage from '@/components/PageNotFound';

const PrivateRoute = ({
  element,
  authenticated,
  path = '/login',
}: {
  element: JSX.Element;
  authenticated: boolean;
  path?: string;
}) => {
  return authenticated ? element : <Navigate to={path} />;
};

const Routing = () => {
  const userData = Store.getUser();

  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route path="/login" element={<PrivateRoute element={<Login />} authenticated={!userData} path="/" />} />
      <Route path="/register" element={<PrivateRoute element={<Register />} authenticated={!userData} path="/" />} />

      {/* Rotas protegidas */}
      <Route path="/" element={<PrivateRoute element={<Songs />} authenticated={!!userData} />} />
      <Route path="/playlists" element={<PrivateRoute element={<Playlists />} authenticated={!!userData} />} />
      <Route
        path="/playlists/detail/:id"
        element={<PrivateRoute element={<PlaylistDetail />} authenticated={!!userData} />}
      />
    </Routes>
  );
};

export default Routing;
