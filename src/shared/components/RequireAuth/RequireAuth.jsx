import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({children}) {
  let location = useLocation();

  if(!localStorage.getItem('token')) return <Navigate to='/' state={{ from: location }} replace />;


  return children;
}

export default RequireAuth