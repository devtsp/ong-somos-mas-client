import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import styles from './styles/CategoriesTable.module.scss';

import Table from '../../../../components/Table/Table';
import { Loader } from '../../../../components/loader/Loader';
import { loadCategories, deleteCategory } from '../../../../redux/actions/categories.actions';

const CategoriesTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.categories);

  const handleDelete = async (fields) => {
    const result = await Swal.fire({
      title: `Borrar categoria ${fields.name.replace(/\W/, '')}?`,
      text: `Esta operación no puede deshacerse!`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'green',
      iconColor: 'red',
    });
    if (result.isConfirmed) {
      dispatch(deleteCategory({ url: `/categories/${fields.id}`, method: 'delete' }));
    }
  };

  const handleEdit = async (fields) => {
    const { name, description, id } = fields;
    navigate('editar', {
      state: {
        title: 'Editar Categoría',
        fields: { name, description },
        options: { method: 'put', url: `/categories/${id}` },
        from: location,
      },
    });
  };

  const handleCreate = async () => {
    navigate('crear', {
      state: {
        title: 'Ingresar Categoría',
        options: { method: 'post', url: `/categories` },
        from: location,
        fields: { name: '', description: '' },
      },
    });
  };

  useEffect(() => {
    dispatch(loadCategories({ method: 'get', url: '/categories' }));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : categories.length ? (
        <Table
          title='Categorias'
          tableHeader={['Titulo', 'Descripción']}
          tableRowsData={categories}
          tableRowsProperties={['name', 'description']}
          buttons={[
            { title: 'Editar', handler: handleEdit, className: 'white' },
            { title: 'Eliminar', handler: handleDelete, className: 'orange' },
          ]}
          loading={loading}
          addBtnHandler={handleCreate}
        />
      ) : (
        <div className={styles.empty}>No se encontraron categorias</div>
      )}
    </div>
  );
};

export default CategoriesTable;
