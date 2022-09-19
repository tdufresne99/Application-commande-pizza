import './UnePizzaSaved.css';
import PatePizza from '../PatePizza/PatePizza';

const UnePizzaSaved = ({pizza}) => {

    const src = (i) => {
        return "../Img/pizza_"+pizza.imgs[i]+".png";
    };

    return (
        <li className='unePizza'>
            <h2>{pizza.nom}</h2>
            <p> Ingrédients: 
            {pizza.ingredients.map(function(ingredient,i){
                return(
                    " " + ingredient + ", "
                );
            })}
            </p>
            <div className='imgs'>
            <img src='./Img/pizza_pate.png'></img>
            <img src='./Img/pizza_sauce.png'></img>
            {pizza.ingredients.map(function(ingredient,i){
                return(
                    <img key={i} src={src(i)}></img>
                );
            })}
            </div>
        </li>
    );
};

export default UnePizzaSaved;