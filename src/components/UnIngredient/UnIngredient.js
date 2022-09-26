
import './UnIngredient.css';


const UnIngredient = ({checkFn,ingredient}) => {
    const onChangeHandler = () => {
        checkFn(ingredient);
    }
    const img = () => {
        let afficheImg;
        let src = "/Img/pizza_"+ingredient.img+".png";
        (ingredient.checked) ? afficheImg = <img className='imgIngredient' src={src}></img> : afficheImg = '';
        return afficheImg;
    };
    return (
        <li className='liIngredient'>
            <div className='choixIngrendient'>
                <label className='nomIngredient' htmlFor={ingredient.nom}>{ingredient.nom}</label>
                <input id={ingredient.nom} className='checkIngredient' type="checkbox" checked={ingredient.checked} onChange={onChangeHandler}/>
            </div>
        </li>
    );
};
export default UnIngredient;