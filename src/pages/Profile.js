import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_BASE;

export default function Profile() {
  const auth = useSelector(st => st.auth);
  const { token } = auth;
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/users/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
  
        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();
  }, [token]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='text-zinc-50'>
          {Array.from(Object.keys(userInfo)).map((item, i) => <p key={`${item}-${i}`}>{item}: {userInfo[item]}</p>)}
        </div>
      )}
    </>
  );
}