import React, { useState } from 'react';
import logo from '../assets/logo.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faGoogle,faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Sign_up = ({xxx}) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  

  function toSignIn (){
    navigate('/signin');
  } 

  const handleSubmit = async (event) => {

    event.preventDefault();
   // bech yadapti asemi les champs selon schema eli fel backend , mahabitch nmess partie el html
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
  
    const adjustedFormData = {
      nom: formObject.name,
      prenom: formObject.lastname,
      email: formObject.email,
      password: formObject.password,
      DN: formObject.birthdate,
      tel: formObject.phoneNumber,
    };
    
    // selon el prop eli taadet
    const url_sign= "http://localhost:4000/api/users/register_"+ xxx; 
    console.log(url_sign);
    // teba3 el AuthContext
    setIsLoading(true);
    setError(null);
    try {
      

      const response = await fetch(url_sign, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adjustedFormData),
      });
      
      const data = await response.json();

      // Check if the response was successful
      if (response.ok) {
        // Handle successful registration
        // saving the user in the LS
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));

        // update AuthContext
        
        dispatch({type: 'LOGIN', payload: data})

        // update loading state
        setIsLoading(false)

        // For example, you might show a success message to the user
        console.log('Registration successful');
        
        navigate('/'+xxx);
      } else {
        // Handle unsuccessful registration
        setIsLoading(false);
        setError(data.error);
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error);
      setError(error);
      // Handle other types of errors, such as network errors
    }
  };
  
  
  
  const validateEmail = (email) => {
    // Add email validation logic here
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(validateEmail(event.target.value));
  };
  
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleGoogleSignIn = () => {
    // Perform Google sign-in logic here
  };
  
  const handleAppleSignIn = () => {
    // Perform Apple sign-in logic here
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-xg w-1/3 mx-auto">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <div className="flex text-center">
            <img
              className="h-20 w-auto px-left "
              src={logo}
              alt="Takwirti"
            />
            <h2 className="text-3xl font-bold text-gray-900 pt-4 pl-5">
  {xxx === "particulier" ? "Get started now and book fields!" : "Get started now as a Responsable!"}
</h2>


          </div>
          {/*Form*/}
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            {/*name*/}
            <div className="flex space-x-6">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                  />
                </div>
              </div>
              {/*lastname*/}
              <div className="w-1/2">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    autoComplete="lastname"
                    required
                    className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            {/*email*/}
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
                  onChange={handleEmailChange}
                  className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                />
              </div>
            </div>
            {/*password*/}
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
                   className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                 />
               </div>
            </div>
            {/*confirmpassword*/}
            <div>
               <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-900">
                 Confirm Password
               </label>
               <div className="mt-1">
                 <input
                   id="confirmpassword"
                   name="confirmpassword"
                   type="confirmpassword"
                   autoComplete="confirmpassword"
                   required
                   className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                 />
               </div>
            </div>
            {/*birthdate*/}
            <div className="flex space-x-6">
              <div className="w-1/2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-900">
                  Birth date
                </label>
                <div className="mt-1">
                  <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    id="birthdate"
                    name="birthdate"
                    type="birthdate"
                    autoComplete="birthdate"
                    required
                    className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                  />
                </div>
              </div>
              {/*phonenumber*/}
              <div className="w-1/2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    pattern="[0-9]{8}"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="appearance-none bg-gray-100 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm"
                    placeholder="Format: 12345678"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit" disabled = {isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-50 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign up
              </button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
            <hr className="my-6 border-gray-300" />
            <p className="text-center text-sm text-gray-900">Or sign up with</p>
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
            Already have an account?{' '}
            <a onClick={toSignIn} className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign_up;
