import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import SignIn from './app/modules/auth/components/auth.component';
import { AuthProvider } from './app/modules/auth/context/auth.context';
import MaintenanceCrud from './app/modules/maintenance/pages/maintenances.component';
import NavBar from './app/shared/components/navbar.component';
import ProtectedRoutes from './app/shared/routes/protected.routes';

function App() {
  return (
    <main>
      <AuthProvider>
        <Toaster
          closeButton
          position='top-right'
          richColors
        />

        <Router>
          <header>
            <NavBar />
          </header>

          <div style={{ padding: '3em' }}>
            <Routes>
              <Route
                path='/'
                element={<SignIn />}
              />

              <Route element={<ProtectedRoutes />}>
                <Route
                  path='/mantenimiento'
                  element={<MaintenanceCrud />}
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path='/catalogo'
                  element={<h1>Catalogo</h1>}
                />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </main>
  );
}

export default App;
