import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../components/ui/Input'; 
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

    </Card>
  )
}