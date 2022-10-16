import UnePizzaSaved from '../UnePizzaSaved/UnePizzaSaved';
import { Link, Outlet } from 'react-router-dom';
import './LesPizzasSaved.css';
import Panier from '../Panier/Panier';

const LesPizzasSaved = ({lesPizzas, addPanier, panier, sousTotalPanier, viderPanier, passerCommande}) => {
    console.log(lesPizzas)
    const tPizzas = lesPizzas.map(current=>current);
    return (
        <>
            <Panier panier={panier} sousTotal={sousTotalPanier} viderPanier={viderPanier} passerCommande={(commande)=>passerCommande(commande)}/>
            <div className='row'>
                <Outlet/>
            </div>
            <div className="row">
                <ul>
                    {lesPizzas.map((unePizza, i) => {
                        return(
                            <li key={unePizza.nom} className="unePizzaSaved">
                                <UnePizzaSaved pizza={unePizza} index={i} addPanier={(newPizza) => addPanier(newPizza)}/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default LesPizzasSaved;