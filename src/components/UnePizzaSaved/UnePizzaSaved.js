import './UnePizzaSaved.css';
import { Link } from 'react-router-dom';
import PatePizza from '../PatePizza/PatePizza';


const UnePizzaSaved = ({pizza, index, addPanier}) => {
    const unePizza = pizza;
    const src = (i) => {
        return "../Img/pizza_"+unePizza.imgs[i]+".png";
    };
    return (
        <div className='unePizza'>
            <Link className='lienPizzaDetail' to={'/pizzas/'+index}>
                <h3 className='nomPizza'>{unePizza.nom}</h3>
                <div className='imgs'>
                    <PatePizza/>
                    {unePizza.ingredients.map(function(ingredient,i){
                        return(
                            <img key={i} src={src(i)} alt={ingredient.img}></img>
                            );
                        })}
                </div>
                <p className='prix'>{unePizza.prix.toFixed(2)}$</p>
            </Link>
            <button className='addPanier' onClick={() => addPanier(unePizza)}>Ajouter au panier</button>
        </div>
    );
};

export default UnePizzaSaved;