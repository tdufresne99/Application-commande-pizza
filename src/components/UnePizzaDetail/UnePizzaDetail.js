import PatePizza from '../PatePizza/PatePizza';
import { useLoaderData, useParams } from 'react-router-dom';

export const unePizzaDetailLoader = ({params}) => {
    console.log(params);
    const monIndex = +params.pizzaId;
    return monIndex;
};

const UnePizzaDetail = ({lesPizzas}) => {
    const pizzaId = useLoaderData();
    console.log("Pizza ID: " + pizzaId);
    const maPizza = lesPizzas[pizzaId];
    console.log(maPizza);
    const src = (i) => {
        return "../Img/pizza_"+maPizza.imgs[i]+".png";
    };

    return (
        <div className='pizzaDetail'>
            <h2>{maPizza.nom}</h2>
            <div className='imgs'>
                <PatePizza/>
                {maPizza.ingredients.map(function(ingredient,i){
                    return(
                        <img key={i} src={src(i)}></img>
                    );
                })}
            </div>
            <ul>
                {maPizza.ingredients.map(function(ingredient){
                    return(
                        <li key={ingredient}>{ingredient}</li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UnePizzaDetail;