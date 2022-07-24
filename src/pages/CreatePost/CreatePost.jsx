import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument('posts');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL');
    }

    const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body)
      setFormError('Por favor, preencha todos os dados');

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate('/');
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Escolha um título"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="Insira uma imagem que represente o seu post"
            value={image}
            onChange={({ target }) => setImage(target.value)}
            required
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Insira o conteúdo o post"
            value={body}
            onChange={({ target }) => setBody(target.value)}
            required
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por vírgulas."
            value={tags}
            onChange={({ target }) => setTags(target.value)}
            required
          />
        </label>
        {!response.loading && <button className="btn">Postar</button>}
        {response.loading && (
          <button style={{ cursor: 'wait' }} className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
