import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import style from './styles/NewsList.module.scss';

import { fetchNews } from '../../redux/actions/news.actions';

const NewsList = ({ quantity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entries: news, error, loading } = useSelector((state) => state.news);

  React.useEffect(() => {
    dispatch(fetchNews({ method: 'get', url: '/news' }));
  }, [dispatch]);

  return (
    <ul className={style.container}>
      {error && `${error}`}
      {loading && 'Loading...'}
      {news.length ? (
        news.slice(0, quantity).map(({ name, image, id, content }) => (
          <li className={style.card} key={id}>
            <div
              className={style.img}
              style={{
                backgroundImage: `url('${image}')`,
              }}></div>
            <div>
              <h1>{name.length > 50 ? name.slice(0, 50) + '...' : name}</h1>
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
