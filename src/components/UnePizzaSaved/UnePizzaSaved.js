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
            <Link to={'/pizzas/'+index}>
                <h3>{unePizza.nom}</h3>
                <p>{unePizza.prix}$</p>
                <div className='imgs'>
                    <PatePizza/>
                    {unePizza.ingredients.map(function(ingredient,i){
                        return(
                            <img key={i} src={src(i)} alt={ingredient.img}></img>
                        );
                    })}
                </div>
            </Link>
            <button className='addPanier' onClick={() => addPanier(unePizza)}>Ajouter au panier</button>
        </div>
    );
};

export default UnePizzaSaved;