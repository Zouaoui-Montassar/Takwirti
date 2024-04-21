import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1 className="text-red-500">404 - Not Found</h1>
    <p>The page you are looking for is unavailable.</p>
    <Link to="/signin" className="text-green-500">Go to Login Page</Link>
  </div>
);

export default NotFound;
