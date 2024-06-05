import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/user/userApi';

export const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const result = await loginUser({ email, password });

      if (result.data?.access_token) {
        localStorage.setItem('access_token', result.data.access_token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        navigate('/app/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={isLoading}>
        Log In
      </button>
      {error && <p style={{ color: 'red' }}>Error during login</p>}
    </div>
  );
};
