import { createContext, useContext, useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { Form, IAuthContext } from '../types';
import { API_URL } from '../constants';

const AuthContext = createContext<IAuthContext>({
  formData: { username: '', password: '' },
  setFormData: () => {},
  isAuthSuccess: false,
  setIsAuthSuccess: () => {},
  isShowModal: false,
  setIsShowModal: () => {},
  handleChange: () => {},
  handleRegister: async () => {},
  handleLogin: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<Form>({ username: '', password: '' });
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleError = (error: Error) => {
    console.error('Error:', error.message);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      setIsAuthSuccess(true);
      setIsShowModal(true);
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuthSuccess(true);
      } else {
        setIsAuthSuccess(false);
      }
      setIsShowModal(true);
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthSuccess, 
      setIsAuthSuccess, 
      formData, 
      setFormData,
      handleChange,
      handleRegister,
      handleLogin,
      isShowModal, 
      setIsShowModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
