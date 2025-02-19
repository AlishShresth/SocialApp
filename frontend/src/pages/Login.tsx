import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '../components/ui/Card'
import LoginForm from '../components/authentication/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Welcome Section */}
          <div className="flex flex-col items-center justify-center space-y-6 p-8">
            <Card className="w-full max-w-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Welcome to Postagram!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Login now and start enjoying!
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Don't have an account?{' '}
                  <Link
                    to="/register/"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                           dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Register here
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Login Form Section */}
          <div className="w-full max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;