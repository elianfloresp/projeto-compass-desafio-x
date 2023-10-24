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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO7qHYYUDrlBwpYBIa_m9JMAA6oKdqoeY",
  authDomain: "uolkut-f63cf.firebaseapp.com",
  projectId: "uolkut-f63cf",
  storageBucket: "uolkut-f63cf.appspot.com",
  messagingSenderId: "329224674491",
  appId: "1:329224674491:web:8ff489a7146089f8779d9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };

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
