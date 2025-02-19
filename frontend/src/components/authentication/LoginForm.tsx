import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert, AlertDescription } from '../ui/Alert';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
  }
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<Object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post<AuthResponse>('http://localhost:8000/api/auth/login/', form);

      localStorage.setItem('auth', JSON.stringify({
        access: response.data.access,
        refresh: response.data.refresh,
        user: response.data.user,
      }));

      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    };
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const PasswordToggleButton = () => (
    <button type='button' onClick={togglePasswordVisibility} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray700 dark:test-gray-400 dark:hover:text-gray-300 focus-outline-none curs' aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <Eye size={16} /> : <EyeOff size={16} />}</button>
  );

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input label='Email' value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })} required placeholder='Enter email' startIcon={<User size={16} />} error={Boolean(error && error.hasOwnProperty('email'))} autoComplete='email' type='email' />
          <Input label="Password" value={form.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })} required type={showPassword ? 'text' : 'password'} placeholder='Enter password' startIcon={<Lock size={16} />} endIcon={<PasswordToggleButton />} minLength={8} error={Boolean(error && error.hasOwnProperty('password'))} helperText="Password must be at least 8 characters long" autoComplete='current-password' />

          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error.hasOwnProperty('password') && error['password'][0]}{error.hasOwnProperty('username') && error['username'][0]}{error.hasOwnProperty('detail') && error['detail']}</AlertDescription>
            </Alert>
          )}

          <Button type='submit' className='w-full' isLoading={isLoading} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;