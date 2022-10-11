import './App.css';
import Titre from './components/Titre/Titre';
import Login from './components/Login/Login';
import Panier from './components/Panier/Panier';
import LesCommandes from './components/LesCommandes/LesCommandes';
import LesPizzasSaved, {lesPizzasSavedLoader} from './components/LesPizzasSaved/LesPizzasSaved';
import Layout from './components/Layout/Layout';
import PizzaPersoEdit from './components/PizzaPersoEdit/PizzaPersoEdit';
import UnePizzaDetail from './components/UnePizzaDetail/UnePizzaDetail';
import { RouterProvider, createBrowserRouter, Navigate, Outlet, useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';


const lesPizzasDefauts = [
  {nom:"La Pizza du Jour", ingredients:["Fromage", "Tomates", "Piments Verts", "Piments Rouges", "Olives Vertes", "Oignons Blancs"], imgs:["fromage", "tomate", "pimentVert", "pimentRouge", "oliveVerte", "oignonBlanc"], prix: 37, qt:1},
  {nom:"L'écarlate", ingredients:["Tomates", "Piments Rouges", "Oignons Rouges"], imgs:["tomate", "pimentRouge", "oignonRouge"], prix: 26, qt:1},
  {nom:"La Golden Pizza", ingredients:["Fromage", "Piments Jaunes", "Oignons Blancs", "Ananas"], imgs:["fromage", "pimentJaune", "oignonBlanc", "ananas"], prix: 38, qt:1},
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
  const [nbItemPanier, setNbItemPanier] = useState(0);
  const [sousTotalPanier, setSousTotalPanier] = useState(0);

  const updatePanier = (newItem) => {
    setSousTotalPanier((current)=>current+newItem.prix);
    setNbItemPanier((current)=>current+1);

    let existe = false;
    lePanier.map(item => {
      if(newItem.nom === item.nom) {
        existe = true;
        console.log(item.qt);
        item.qt++;
        console.log(item.qt);

      }
    })
    if(!existe){
      setLePanier(currentPanier => [newItem, ...currentPanier]);
    }
  };

  const viderPanier = () => {
    // lePanier.map(item => {
    //   item.qt = 1;
    // });
    setLePanier([]);
    setNbItemPanier(0);
    setSousTotalPanier(0);
  }


  // Liste des commandes sauvegardées (state)
  const [lesCommandes, setLesCommandes] = useState([]);

  const passerCommande = (newCommande) => {
    console.log(newCommande);
    newCommande.prix = sousTotalPanier;
    setLesCommandes(currentCommandes => [...currentCommandes, newCommande]);
    viderPanier();
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
      element: <Layout nbItems={nbItemPanier}/>,
      children: [ 
        {
          path: 'pizzas',
          element:  <LesPizzasSaved lesPizzas={lesPizzasSaved} addPanier={(newPizza) => updatePanier((JSON.parse(JSON.stringify(newPizza))))} panier={lePanier} sousTotalPanier={sousTotalPanier} viderPanier={()=>viderPanier()} passerCommande={(commande)=>passerCommande(commande)}/>,
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
          path: 'commandes',
          element: <LesCommandes lesCommandes={lesCommandes}/>,
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
