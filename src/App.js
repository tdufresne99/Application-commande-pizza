import './App.css';
import Titre from './components/Titre/Titre';
import Login from './components/Login/Login';
import LesPizzasSaved, {lesPizzasSavedLoader} from './components/LesPizzasSaved/LesPizzasSaved';
import Layout from './components/Layout/Layout';
import UnePizzaDetail, {unePizzaDetailLoader} from './components/UnePizzaDetail/UnePizzaDetail';
import PizzaPersoEdit from './components/PizzaPersoEdit/PizzaPersoEdit';
import { RouterProvider, createBrowserRouter, Navigate, Outlet, useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const lesPizzasDefauts = [
    {nom:"La Pizza du Jour", ingredients:["Fromage", "Tomates", "Piments Verts", "Piments Rouges", "Olives Vertes", "Oignons Blancs"], imgs:["fromage", "tomate", "pimentVert", "pimentRouge", "oliveVerte", "oignonBlanc"]},
    {nom:"L'écarlate", ingredients:["Tomates", "Piments Rouges", "Oignons Rouges"], imgs:["tomate", "pimentRouge", "oignonRouge"]},
    {nom:"La Golden Pizza", ingredients:["Fromage", "Piments Jaunes", "Oignons Blancs", "Ananas"], imgs:["fromage", "pimentJaune", "oignonBlanc", "ananas"]},
  ];

  const [lesPizzasSaved, setLesPizzasSaved] = useState(lesPizzasDefauts);


  const savePizza = (newPizza) => {
    console.log(newPizza);
    setLesPizzasSaved(currentPizzasSaved => [newPizza, ...currentPizzasSaved]);
  };

  const [userName, setUserName] = useState('');
  const authentifierUser = () => {
    const username = userName.trim();
    return username
  }
  const routes = authentifierUser !== '' ? [
    
    // Si l'utilisateur est connecté ---------->

    { // Redirige tous les URL qui ne sont pas reconnu vers /pizzas (error 404)
      path: '*',
      element: <Navigate to='/pizzas'/>,
    }, 

    { // Page d'accueil du site: le Titre, la Navigation et la Liste des Pizzas Saved.
      path:'/',
      element: <Layout/>,
      children: [ 
        {
          path: 'pizzas',
          element:  <LesPizzasSaved lesPizzas={lesPizzasSaved}/>,
          children: [
            {
              path: ':pizzaId',
              element: <UnePizzaDetail lesPizzas={lesPizzasSaved}/>,
              loader: unePizzaDetailLoader,
              errorElement: <Navigate to="/pizzas"/>
            },
            {
              path: 'creer',
              element: <PizzaPersoEdit addPizza={(newPizza) => savePizza(newPizza)} nbPizzas={lesPizzasSaved.length}/>,
            },
          ],
        },
        {
          path: 'login',
          index: true,
          element: <Navigate to="/pizzas"/>,
        }
      ]
    }
  ] : [
    {
      path: '*',
      element: <Navigate to='/login'/>,
    }, 
    {
      path: '/',
      element:  <div className="App">
                  <Titre/>
                  <Outlet/>
                </div>,
      children: [
        {
          path: 'login',
          element: <Login saveUser={(nomUser) => setUserName(nomUser)}/>,
        }, 
        {
          index: true,
          element: <Navigate to="/login"/>,
        }
      ]
    }
  ];

  return (
    <RouterProvider router={createBrowserRouter(routes)}/>
  );
}

export default App;
