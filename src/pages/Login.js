import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const API = process.env.REACT_APP_API_BASE;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });

  const [form, setForm] = useState({ email: '', password: '', lembrar: false });
  const handleChange = evt => {
    setForm(st => ({ ...st, [evt.target.name]: evt.target.value }));
  }

  const handleCheckChange = evt => {
    setForm(st => ({...st, lembrar: !st.lembrar}));
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (!!form.email.trim() && !!form.password.trim()) {
      setLoading(true);
      setNotification({ status: '', message: '' });
      try {
        const response = await fetch(`${API}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('E-mail ou senha inválidos.');
          }
        }

        const data = await response.json();
        dispatch(authActions.login({
          token: data.access_token, expiration: data.expires_in
        }));
        setLoading(false);
        navigate('/perfil');

      } catch (error) {
        setNotification({ status: 'error', message: error.message });
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full md:w-3/4 lg:w-3/5'>
      <div className='px-12'>
        <div className='flex flex-col gap-5 p-6 rounded bg-slate-800 border border-indigo-500 shadow-md shadow-indigo-900 text-zinc-50 text-lg font-medium'>
          <div className='flex flex-col gap-2 items-center'>
            <label htmlFor='email'>E-mail</label>
            <input autoComplete='off' disabled={loading} required onChange={handleChange} value={form.email} className='bg-slate-100 disabled:bg-slate-700 disabled:text-slate-400 text-slate-800 w-full font-normal text-base rounded p-2 text-slate-700' placeholder='exemplo@email.com' id='email' type='email' name='email' />
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <label htmlFor='password'>Senha</label>
            <input autoComplete='off' disabled={loading} required onChange={handleChange} value={form.password} className='bg-slate-100 disabled:bg-slate-700 disabled:text-slate-400 text-slate-800 w-full font-normal text-base tracking-widest rounded p-2 text-slate-700' placeholder='●●●●●●' id='password' type='password' name='password' />
          </div>
          <div className='flex gap-1 pl-1 my-1'>
            <input id="lembrar" name="lembrar" type="checkbox" value="1" checked={form.lembrar} onChange={handleCheckChange} />
            <label className='rounded text-base font-normal' htmlFor='lembrar'>Lembrar-me</label>
          </div>
          {notification.message && <Notification message={notification.message} status={notification.status} />}
          {loading ? (
            <div className='flex justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <div className='mt-2 flex justify-center'>
              <button className='bg-dourado-500 rounded py-1 px-3 text-lg font-medium hover:bg-indigo-900 border border-dourado-500'>Login</button>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}