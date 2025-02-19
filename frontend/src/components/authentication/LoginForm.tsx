import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert, AlertDescription } from '../ui/Alert';
import { Lock, User } from 'lucide-react';

interface FormData {
  username: string;
  password: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
  }
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input label='Username' value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required placeholder='Enter username' startIcon={<User size={16} />} error={Boolean(error)} autoComplete='username' />
          <Input label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type='password' placeholder='Enter password' startIcon={<Lock size={16} />} minLength={8} error={Boolean(error)} helperText="Password must be at least 8 characters long" autoComplete='current-password' />

          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
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