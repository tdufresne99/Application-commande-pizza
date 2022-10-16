import './UnePizzaSaved.css';
import { Link } from 'react-router-dom';
import PatePizza from '../PatePizza/PatePizza';


const UnePizzaSaved = ({pizza, index, addPanier}) => {
    const unePizza = pizza;
    console.log(pizza);
    const src = (i) => {
        return "../Img/pizza_"+pizza.ingredients[i].img+".png";
    };
    return (
        <div className='unePizza'>
            <Link className='lienPizzaDetail' to={'/pizzas/'+index}>
                <h3 className='nomPizza'>{pizza.nom}</h3>
                <div className='imgs'>
                    <PatePizza/>
                    {pizza.ingredients.map((ingredient,i) => {
                        return(
                            <img key={i} src={src(i)} alt={ingredient.img}></img>
                        );
                    })}
                </div>
                <p className='prix'>{pizza.prix.toFixed(2)}$</p>
            </Link>
            <button className='addPanier' onClick={() => addPanier(pizza)}>Ajouter au panier</button>
        </div>
    );
};

export default UnePizzaSaved;