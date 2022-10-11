import './App.css';
import Titre from './components/Titre/Titre';
import Login from './components/Login/Login';
import Panier from './components/Panier/Panier';
import Commandes from './components/Commandes/Commandes';
import LesPizzasSaved, {lesPizzasSavedLoader} from './components/LesPizzasSaved/LesPizzasSaved';
import Layout from './components/Layout/Layout';
import PizzaPersoEdit from './components/PizzaPersoEdit/PizzaPersoEdit';
import UnePizzaDetail from './components/UnePizzaDetail/UnePizzaDetail';
import { RouterProvider, createBrowserRouter, Navigate, Outlet, useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';


const lesPizzasDefauts = [
  {nom:"La Pizza du Jour", ingredients:["Fromage", "Tomates", "Piments Verts", "Piments Rouges", "Olives Vertes", "Oignons Blancs"], imgs:["fromage", "tomate", "pimentVert", "pimentRouge", "oliveVerte", "oignonBlanc"], prix: 37},
  {nom:"L'écarlate", ingredients:["Tomates", "Piments Rouges", "Oignons Rouges"], imgs:["tomate", "pimentRouge", "oignonRouge"], prix: 26},
  {nom:"La Golden Pizza", ingredients:["Fromage", "Piments Jaunes", "Oignons Blancs", "Ananas"], imgs:["fromage", "pimentJaune", "oignonBlanc", "ananas"], prix: 38},
];

function App() {

  // Liste des pizza sauvegardées (state)
  const [lesPizzasSaved, setLesPizzasSaved] = useState(lesPizzasDefauts);

  const savePizza = (newPizza) => {
    console.log(newPizza);
    setLesPizzasSaved(currentPizzasSaved => [newPizza, ...currentPizzasSaved]);
  };


  // Le panier (state)
  const [lePanier, setLePanier] = useState([])

  const savePanier = (newItem) => {
    console.log(newItem);
    newItem.qt = 6;
    let existe = false;
    const newPanier = lePanier.map(item => {
      if(newItem.nom === item.nom){
        item.qt++;
        existe = true;
      } 
      return item;
    })
    if(existe) setLePanier(newPanier);
    else setLePanier(currentPanier => [newItem, ...currentPanier]);
  };


  // Liste des commandes sauvegardées (state)
  const [lesCommandes, setLesCommandes] = useState()

  const saveCommande = (newCommande) => {
    console.log(newCommande);
    setLesCommandes(currentCommandes => [newCommande, ...currentCommandes]);
  };


  // Nom d'utilisateur et vérifications
  const [userName, setUserName] = useState('');
  const [codeErreur, setCodeErreur] = useState(false);
  const [nomInvalide, setNomInvalide] = useState(true); // <------------------------------------------------------------- À changer pour true

  const verificationUserName = (nomUser) => {
    const specialChars = /[ 0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const estInvalide = specialChars.test(nomUser);
    if(!estInvalide)setUserName(nomUser);
    setCodeErreur(estInvalide);
    setNomInvalide(estInvalide);
  }


  const routes = !nomInvalide ? [
    
    // Si l'utilisateur est connecté ---------->

    { // Redirige tous les URL vers /pizzas (error 404)
      path: '*',
      element: <Navigate to='/pizzas'/>,
    }, 

    { // Page d'accueil du site: le Titre, la Navigation et la Liste des Pizzas Saved.
      path:'/',
      element: <Layout nbItems={lePanier.length}/>,
      children: [ 
        {
          path: 'pizzas',
          element:  <LesPizzasSaved lesPizzas={lesPizzasSaved} addPanier={(newPizza) => savePanier(newPizza)}/>,
          children: [
            {
              path: ':pizzaId',
              element: <UnePizzaDetail lesPizzas={lesPizzasSaved}/>,

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
        },
        {
          path: 'panier',
          element: <Panier panier={lePanier}/>,
        },
        {
          path: 'commandes',
          element: <Commandes/>,
        },
      ]
    }
  ] : [ 
    
    // Si l'utilisateur n'est pas connecté ---------->
    
    { // Redirige tous les URL vers /login (error 404)
      path: '*',
      element: <Navigate to='/login'/>,
    }, 
    { // Le login
      path: '/',
      element:  <div className="App">
                  <Titre/>
                  <Outlet/>
                </div>,
      children: [
        {
          path: 'login',
          element: <Login saveUser={(nomUser) => verificationUserName(nomUser)} codeErreur={codeErreur}/>,
        }, 
        {
          index: true,
          element: <Navigate to='/login'/>
        }
      ]
    }
  ];

  return (
    <RouterProvider router={createBrowserRouter(routes)}/>
  );
}

export default App;
