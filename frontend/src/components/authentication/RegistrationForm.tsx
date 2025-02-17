import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Alert, AlertDescription } from '../ui/Alert';


interface FormData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  bio?: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;

    if (!registrationForm.checkValidity()) {
      event.stopPropagation();
      return;
    }

    setValidated(true);

    try {
      const response = await axios.post<AuthResponse>('http://localhost:8000/api/auth/register/', form);

      localStorage.setItem('auth', JSON.stringify({
        access: response.data.access,
        refresh: response.data.refresh,
        user: response.data.user,
      }));

      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Input value={form.first_name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, first_name: e.target.value })} type='text' placeholder='Enter first name' label="First Name"
 className='w-full' required />
          </div>
          <div>
            <Input value={form.last_name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, last_name: e.target.value })} type='text' placeholder='Enter last name' label="Last Name" className='w-full' required />
          </div>
          <div>
            <Input value={form.username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, username: e.target.value })} type='text' placeholder='Enter username' label="Username"className='w-full' required />
          </div>
          <div>
            <Input value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })} type='email' placeholder='Enter email' label="Email Address" className='w-full' required />
          </div>
          <div>
            <Input value={form.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })} type='password' placeholder='Password' label="Password" className='w-full' required />
          </div>
          <div>
            <Textarea value={form.bio} onChange={(e: any) => setForm({ ...form, bio: e.target.value })} label="Bio" placeholder='A simple bio ... (Optional)' className='w-full' />
          </div>
          {
            error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )
          }

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
};

export default RegistrationForm;