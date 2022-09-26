import './UnePizzaSaved.css';
import PatePizza from '../PatePizza/PatePizza';

const UnePizzaSaved = ({pizza}) => {

    const src = (i) => {
        return "../Img/pizza_"+pizza.imgs[i]+".png";
    };

    return (
        <div className='unePizza'>
            <h3>{pizza.nom}</h3>
            {/* <p> Ingrédients: 
                {pizza.ingredients.map(function(ingredient,i){
                    return(
                        " " + ingredient + ", "
                    );
                })}
            </p> */}
            <div className='imgs'>
                <PatePizza/>
                {pizza.ingredients.map(function(ingredient,i){
                    return(
                        <img key={i} src={src(i)}></img>
                    );
                })}
            </div>
        </div>
    );
};

export default UnePizzaSaved;