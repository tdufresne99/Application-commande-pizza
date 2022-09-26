import PatePizza from '../PatePizza/PatePizza';
import { useLoaderData } from 'react-router-dom';
import '../UnePizzaDetail/UnePizzaDetail.css';

export const unePizzaDetailLoader = ({params}) => {
    // const nbPizzas = lesPizzas.length - 1;
    // console.log(lesPizzas[0]);
    // const maPizza = lesPizzas[0];
    // return maPizza;

    console.log(params);
    const monIndex = +params.pizzaId;
    return monIndex;
};

const UnePizzaDetail = ({lesPizzas}) => {
    const index = useLoaderData();
    const maPizza = lesPizzas[index];
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
                        <img key={i} src={src(i)} alt={ingredient.img}></img>
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