import styles from './EditPost.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(', ');
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument('posts');
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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    };

    updateDocument(id, data);

    navigate('/dashboard');
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando: {post.title}</h2>
          <p>Altere os dados do post como desejar.</p>
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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button style={{ cursor: 'wait' }} className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
