import React from "react";
import Header from './components/UI/StyledHeader';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Footer from './components/UI/Footer';
import { styled } from 'styled-components';
import useMediaQuery from './hooks/use-media-query';
import { onAuthStateChanged } from '@firebase/auth';
import { useState, useEffect } from "react";
import { useAuthentication } from './hooks/useAuthentication';



const MainContent = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;




const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className='App'> 
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      {!isMobile && <Footer />}
    </div>
  );
};

export default App;
