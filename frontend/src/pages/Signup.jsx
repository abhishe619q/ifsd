import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/signup', { name: 'User', email, password: pass });
    setUser(res.data);
    nav('/');
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="password" />
      <button type="submit">Signup</button>
    </form>
  );
}
