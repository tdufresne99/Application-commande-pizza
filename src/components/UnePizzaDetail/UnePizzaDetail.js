import PatePizza from '../PatePizza/PatePizza';
import { useParams } from 'react-router-dom';
import '../UnePizzaDetail/UnePizzaDetail.css';

const UnePizzaDetail = ({lesPizzas, addPanier}) => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const {pizzaId} = useParams();
    console.log(pizzaId);
    const maPizza = lesPizzas[pizzaId];
    console.log(maPizza);
    const src = (i) => {
        return "../Img/pizza_"+maPizza.imgs[i]+".png";
    };

    return (
        <div className='pizzaDetail'>
            <h3 className='nomPizza'>{maPizza.nom}</h3>
            <p className='prix'>{maPizza.prix.toFixed(2)}$</p>
            <div className='imgs'>
                <PatePizza/>
                {maPizza.ingredients.map(function(ingredient,i){
                    return(
                        <img key={i} src={src(i)} alt={ingredient.img}></img>
                    );
                })}
            </div>
            <ul className='ingrListeDetail'>
                {maPizza.ingredients.map(function(ingredient){
                    return(
                        <li key={ingredient}>{ingredient}</li>
                    );
                })}
            </ul>
            <button className='addPanier addPanierDetail' onClick={() => addPanier(maPizza)}>Ajouter au panier</button>
        </div>
    );
};

export default UnePizzaDetail;