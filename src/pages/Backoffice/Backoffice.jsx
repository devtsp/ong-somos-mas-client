import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BackofficeCards from '../../components/BackofficeCards/BackofficeCards.jsx';
import { TestimonialBackoffice } from '../../components/testimonials/TestimonialBackoffice';
import Categories from '../../components/Categories/Categories';
import { ActivitiesBackoffice } from '../../components/activities/ActivitiesBackoffice';
const Backoffice = () => {
  return (
    // LayoutBackoffice
    <>
      <Header />
      <Routes>
        <Route path='/' element={<BackofficeCards />} />
        <Route path='/categories' element={<Categories />} />
        {/*<Route path='/backoffice' element={<Backoffice />} /> */}
        <Route path='/testimonios' element={<TestimonialBackoffice />} />
        <Route path='/actividades' element={<ActivitiesBackoffice />} />
      </Routes>
    </>
  );
};

export default Backoffice;
