import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { Songs } from '@/pages/Songs';
import { Playlists } from '@/pages/Playlists';
import { PlaylistDetail } from '@/pages/PlaylistDetail';
import Store from '@/store';

const PrivateRoute = ({ element, authenticated }: { element: JSX.Element; authenticated: boolean }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

const Routing = () => {
  const userData = Store.getUser();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
