import React, { useState } from 'react';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/background.jpg';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Sign_in = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const toSignUp = () => {
    navigate('/signuprespo');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(data.error || 'Oops Email or password is incorrect.');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'LOGIN', payload: data });

        let redirectUrl;
        if (data.__t === 'Particulier') {
          redirectUrl = '/particulier';
        } else if (data.__t === 'Responsable') {
          redirectUrl = '/responsable';
        } else {
          return;
        }

        navigate(redirectUrl);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    // Handle Google sign-in logic
  };

  const handleAppleSignIn = () => {
    // Handle Apple sign-in logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="max-w-4xl w-full md:flex ">
        {/* Left side */}
        <div className="md:w-1/2 md:p-8 bg-white shadow-lg">
          <div className="flex text-center px-4">
            <img
              className="px-left h-20 w-auto mb-4"
              src={logo}
              alt="Takwirti"
            />
            <div className="text-3xl font-bold text-gray-900 pt-5 pl-8">Welcome back!</div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                />
              </div>
              {/* Affichage du message d'erreur */}
              {error && <p className="mt-4 text-center text-bold  text-red-500">{error}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-50 focus:ring-primary-50 border-green-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-50 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign in
              </button>
            </div>
            <hr className="my-6 border-gray-300" />
            <p className="text-center text-sm text-gray-900">Or sign in with</p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="flex items-center justify-center w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleGoogleSignIn}
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                onClick={handleAppleSignIn}
              >
                <FontAwesomeIcon icon={faApple} className="mr-2" />
                Apple
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a onClick={toSignUp} className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </p>
          
        </div>
        {/* Right side */}
        <div className="md:w-1/2 bg-cover bg-center h-64 md:h-auto" style={{ backgroundImage: `url(${backgroundImage})` }}>
          {/* Image */}
          <img className="hidden md:block h-full w-full object-cover" src={backgroundImage} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Sign_in;
