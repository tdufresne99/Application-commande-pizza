import {useState} from 'react';
import UnePizzaSaved from '../UnePizzaSaved/UnePizzaSaved';
import PizzaPersoEdit from '../PizzaPersoEdit/PizzaPersoEdit';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import './LesPizzasSaved.css';

const LesPizzasSaved = ({lesPizzas}) => {
    return (
        <div>
            <div className='row'>
                <Outlet/>
            </div>
            <div className="row">
                <ul>
                    {lesPizzas.map((unePizza, i) => {
                        return(
                            <li key={i} className="unePizzaSaved">
                                <Link to={'/pizzas/'+i}><UnePizzaSaved key={i} pizza={unePizza}/></Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default LesPizzasSaved;