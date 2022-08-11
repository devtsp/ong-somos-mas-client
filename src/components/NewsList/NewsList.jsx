import React from 'react';
import { useNavigate } from 'react-router-dom';

import style from './styles/NewsList.module.scss';

import fetchApi from '../../axios/axios';

const NewsList = ({ quantity }) => {
  const navigate = useNavigate();

  const [news, setNews] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;

    const getNews = async () => {
      try {
        const { data } = await fetchApi({ method: 'get', url: '/news' });
        isMounted && setNews(data);
      } catch (err) {
        setError('');
      }
    };

    getNews();

    return () => (isMounted = false);
  }, []);

  return (
    <ul className={style.container}>
      {news.length ? (
        news.slice(0, quantity).map(({ name, image, id, content }) => (
          <li className={style.card} key={id}>
            <div
              className={style.img}
              style={{
                backgroundImage: `url('${image}')`,
              }}></div>
            <div>
              <p>{content.slice(0, 100)}...</p>
              <button className={style.buttonLink} onClick={() => navigate(`/novedades/${id}`)}>
                Ver Novedad
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>No hay novedades recientes.</p>
      )}
    </ul>
  );
};

export default NewsList;
