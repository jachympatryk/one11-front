import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/user/userApi';
import styles from './auth.module.scss';

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Hasło</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
          />
        </div>
        <button
          className={styles.submitButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          Zaloguj się
        </button>
        {error && <p className={styles.error}>Błąd podczas logowania</p>}
      </div>
    </div>
  );
};
