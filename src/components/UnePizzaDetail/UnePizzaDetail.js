import PatePizza from '../PatePizza/PatePizza';
import { useParams } from 'react-router-dom';
import '../UnePizzaDetail/UnePizzaDetail.css';

// export const unePizzaDetailLoader = ({params}) => {
//     // const nbPizzas = lesPizzas.length - 1;
//     // console.log(lesPizzas[0]);
//     // const maPizza = lesPizzas[0];
//     // return maPizza;

//     console.log('ICI', params);
//     const monIndex = +params.pizzaId;
//     return monIndex;
// };

const UnePizzaDetail = ({lesPizzas}) => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const {pizzaId} = useParams();
    console.log(pizzaId);
    const maPizza = lesPizzas[pizzaId];
    console.log(maPizza);
    const src = (i) => {
        return "../Img/pizza_"+maPizza.imgs[i]+".png";
    };

    return (
        <div id='pizzaTop' className='pizzaDetail'>
            <h2>{maPizza.nom}</h2>
            <h2>{maPizza.prix}$</h2>
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