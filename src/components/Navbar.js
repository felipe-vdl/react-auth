import React from 'react'
import logo from "../imgs/logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

export default function Navbar() {
  const auth = useSelector(st => st.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = evt => {
    evt.preventDefault();

    dispatch(authActions.logout());
    navigate('/login');
  }

  return (
    <div className='min-w-full text-yellow-200 bg-dourado-500 py-2 drop-shadow-md flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center px-4'>
      <div className='w-full md:w-1/3'>
        <NavLink to={'/'}>
          <img src={logo} alt="Logo Mesquita" className='drop-shadow-md w-1/2 mx-auto' />
        </NavLink>
      </div>
      <div className='w-1/3 text-center'>
        <NavLink to={'/'} end className={({ isActive }) => isActive ? 'text-zinc-50' : undefined} >
          <h1 className='NavLinkShadow text-2xl font-bold tracking-wider hover:text-zinc-50'>TECNOLOGIA</h1>
        </NavLink>
      </div>
      <div className='w-1/3 flex justify-center gap-12'>
        {auth.isLoggedIn ? (
          <>
            <NavLink to={'/perfil'} className={({ isActive }) => isActive ? 'text-zinc-50' : undefined} >
              <h1 className='NavLinkShadow text-2xl font-bold tracking-wider hover:text-zinc-50'>PERFIL</h1>
            </NavLink>
            <NavLink onClick={handleLogout} to={'/logout'} className={({ isActive }) => isActive ? 'text-zinc-50' : undefined} >
              <h1 className='NavLinkShadow text-2xl font-bold tracking-wider hover:text-zinc-50'>LOGOUT</h1>
            </NavLink>
          </>
        ): (
          <>
            <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-zinc-50' : undefined} >
              <h1 className='NavLinkShadow text-2xl font-bold tracking-wider hover:text-zinc-50'>LOGIN</h1>
            </NavLink>
          </>
        )}
      </div>
    </div>
  )
}