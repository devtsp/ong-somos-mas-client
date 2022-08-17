import React from 'react';
import styles from './styles/ContactMe.module.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import fetchApi from '../../axios/axios';
import { Link } from 'react-router-dom';

function ContactMe() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    message: Yup.string().required(),
  });
  async function handleSubmit(values) {
    // Should add some UI feedback for the petition result
    fetchApi({ url: '/contacts', method: 'post', data: values });
  }
  return (
    <div className={styles.layout}>
      <div className={styles.asideColumn}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, nisi placeat, corrupti,
          explicabo voluptatum est amet dolorem cum animi numquam dolor! Amet vero tempore
          recusandae libero ipsum aspernatur sequi aut.
        </p>
        <h2>¿Querés contribuir?</h2>
        <button className={styles.colaborateBtn}>Contribuir</button>
      </div>
      <div className={styles.formColumn}>
        <h1>Contactate con nosotros!</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            //For loader integration
            isSubmitting,
          }) => (
            <form className={styles.contactMeForm} onSubmit={handleSubmit}>
              <input
                name='name'
                value={values.name}
                onChange={handleChange}
                placeholder='Nombre y apellido'
                required
              />
              <input
                name='email'
                value={values.email}
                onChange={handleChange}
                placeholder='Email'
                required
              />
              <textarea
                name='message'
                value={values.message}
                onChange={handleChange}
                placeholder='Escribe tu mensaje...'
                required
              />
              <div className={styles.actionsContainer}>
                <button className={styles.submitBtn} type='submit'>
                  Enviar Contacto
                </button>
                <Link to='/'>
                  <button>Ir a Inicio</button>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ContactMe;
