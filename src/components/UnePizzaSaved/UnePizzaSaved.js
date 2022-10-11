import './UnePizzaSaved.css';
import { Link } from 'react-router-dom';
import PatePizza from '../PatePizza/PatePizza';


const UnePizzaSaved = ({pizza, index, addPanier}) => {
    const src = (i) => {
        return "../Img/pizza_"+pizza.imgs[i]+".png";
    };

    return (
        <div className='unePizza'>
            <Link to={'/pizzas/'+index}>
                <h3>{pizza.nom}</h3>
                <p>{pizza.prix}$</p>
                <div className='imgs'>
                    <PatePizza/>
                    {pizza.ingredients.map(function(ingredient,i){
                        return(
                            <img key={i} src={src(i)} alt={ingredient.img}></img>
                        );
                    })}
                </div>
            </Link>
            <button className='addPanier' onClick={() => addPanier(pizza)}>Sauvegarder</button>
        </div>
    );
};

export default UnePizzaSaved;