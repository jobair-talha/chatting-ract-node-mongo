import { useEffect } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, []);
  return <div>Redirect ...</div>;
};

export default Redirect;
