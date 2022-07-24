import styles from './Login.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    const res = await login(user);

    console.log(res);

    setError('');
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do Usuário"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Digite sua senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        {loading ? (
          <button
            style={{ cursor: 'wait' }}
            type="submit"
            disabled
            className="btn"
          >
            Aguarde...
          </button>
        ) : (
          <button type="submit" className="btn">
            Entrar
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
