/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SnackBarUtlities } from '../../../core/utils/snackbar-manager.util';
import { authentication } from '../services/auth.services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  const signin = useCallback(async ({ email, password }) => {
    setLoading(true);

    try {
      const { statusResponse, message } = await authentication({ email, password });
      if (statusResponse != 200) return SnackBarUtlities.error(message);

      setIsAuthenticated(true);
      localStorage.setItem('token', '¡Bienvenido!');
      SnackBarUtlities.success('Inicio de sesión.');
    } catch (error) {
      SnackBarUtlities.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);

    SnackBarUtlities.success('Sesión finalizada.');
  }, []);

  const AuthContextWrapper = useMemo(
    () => ({
      isAuthenticated,
      signin,
      logout,
      loading,
    }),
    [isAuthenticated, signin, logout, loading]
  );

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return setIsAuthenticated(false);
      }

      setIsAuthenticated(true);
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={AuthContextWrapper}>
      {children}
    </AuthContext.Provider>
  );
};
