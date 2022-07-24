import styles from './Home.module.css';

import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails/PostDetails';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading, error } = useFetchDocuments('posts');

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Ou busque por tags..."
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map(post => <PostDetails key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts.</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
