import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue );
        },1000);
        count === 0 && navigate(`/${path}`,{
            state: location.pathname,
        });
        return () => clearInterval(interval);
    },[count, navigate, location, path]);
  return (
    <>
        <div class="d-flex flex-colum justify-content-center align-items-center" style={{height: "100vh"}}>
            <h1 className='Text-center'>redirecting to you in {count} second</h1>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </>
  )
}

export default Spinner;