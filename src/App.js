import './App.css';
import Titre from './components/Titre/Titre';
import Login from './components/Login/Login';
import LesCommandes from './components/LesCommandes/LesCommandes';
import LesPizzasSaved, {lesPizzasSavedLoader} from './components/LesPizzasSaved/LesPizzasSaved';
import Layout from './components/Layout/Layout';
import PizzaPersoEdit from './components/PizzaPersoEdit/PizzaPersoEdit';
import UnePizzaDetail from './components/UnePizzaDetail/UnePizzaDetail';
import ListeIngredients from './components/ListeIngredients/ListeIngredients';
import { RouterProvider, createBrowserRouter, Navigate, Outlet, useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const creerPizzaAleatoire = () => {
    let lesPizzasInit = [];
    for (let i = 0; i < 3; i++) {
      let ingredientsPossibles = ListeIngredients;
      console.log(ingredientsPossibles);
      let ingredientsChoisis = [];
      let prix = 0;
      ingredientsPossibles.map((ingredient, i) => {
        const pourcent = Math.floor(Math.random() * 100);
        if(pourcent >= 50 || i === 0) {
          ingredientsChoisis = [...ingredientsChoisis, ingredient];
          prix += ingredient.prix;
        }
      })
      const unePizza = {
        nom: 'Recommandation du chef #'+(i+1),
        ingredients: ingredientsChoisis,
        prix: prix + 12,
        qt: 1,
      }
      lesPizzasInit.push(unePizza);
    }
    return lesPizzasInit;
  };
  // Liste des pizza sauvegardées (state)
  const [lesPizzasSaved, setLesPizzasSaved] = useState(creerPizzaAleatoire);

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
      element: <Layout/>,
      children: [ 
        {
          path: 'pizzas',
          element:  <LesPizzasSaved lesPizzas={lesPizzasSaved} addPanier={(newPizza) => updatePanier((newPizza))} panier={lePanier} sousTotalPanier={sousTotalPanier} viderPanier={()=>viderPanier()} passerCommande={(commande)=>passerCommande(commande)}/>,
          children: [
            {
              path: ':pizzaId',
              element: <UnePizzaDetail lesPizzas={lesPizzasSaved} addPanier={(newPizza) => updatePanier(newPizza)}/>,

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
