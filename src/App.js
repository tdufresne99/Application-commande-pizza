import './App.css';
import logo from './logo.svg';
import {useState} from 'react';
import Titre from './components/Titre/Titre';
import PizzaPersoEdit from './components/PizzaPersoEdit/PizzaPersoEdit';
import LesPizzasSaved from './components/LesPizzasSaved/LesPizzasSaved';

function App() {

  

  return (
    <div className="App">
      <Titre/>
      <LesPizzasSaved/>
    </div>
  );
}

export default App;
