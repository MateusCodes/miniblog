import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!');
      return;
    }

    const user = {
      displayName,
      email,
      password
    };

    const res = await createUser(user);

    setError('');
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Cria seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do Usuário"
            value={displayName}
            onChange={({ target }) => setDisplayName(target.value)}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </label>
        {loading ? (
          <button style={{cursor: 'wait'}} type="submit" disabled className="btn">
            Aguarde...
          </button>
        ) : (
          <button type="submit" className="btn">
            Cadastrar
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
