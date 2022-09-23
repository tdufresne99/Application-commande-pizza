import './App.css';
import Titre from './components/Titre/Titre';
import Login from './components/Login/Login';
import LesPizzasSaved from './components/LesPizzasSaved/LesPizzasSaved';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const saveUserName = (nomUser) => {
    setUserName(nomUser);
  };

  const [userName, setUserName] = useState('');

  const routes = userName!=='' ? [
    {
        path:'/',
        element: <div className="App">
                    <Titre/>
                    <LesPizzasSaved/>
                  </div>,
    },
  ] : [
    {
        path: '/',
        element:  <div className="App">
                    <Login saveUser={(nomUser) => saveUserName(nomUser)}/>
                  </div>,
    }
  ];

  return (
    <RouterProvider router={createBrowserRouter(routes)}/>
  );
}

export default App;
