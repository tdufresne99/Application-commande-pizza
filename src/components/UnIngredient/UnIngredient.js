
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
                <h5 className='nomIngredient'>{ingredient.nom}</h5>
                <input className='checkIngredient' type="checkbox" checked={ingredient.checked} onChange={onChangeHandler}/>
            </div>
        </li>
    );
};
export default UnIngredient;