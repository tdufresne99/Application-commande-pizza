import UnePizzaSaved from '../UnePizzaSaved/UnePizzaSaved';
import { Link, Outlet } from 'react-router-dom';
import './LesPizzasSaved.css';

const LesPizzasSaved = ({lesPizzas, addPanier}) => {
    return (
        <div>
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
        </div>
    );
};

export default LesPizzasSaved;