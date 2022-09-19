import '../PizzaPersoNom/PizzaPersoNom.css';
import {useState} from 'react';


const PizzaPersoNom = ({reset, save, estSelect}) => {
    const texteInit = '';

    const [titrePizza, setTitrePizza] = useState('');
    const resetPizza = () => {
        reset();
        setTitrePizza(texteInit);
    };
    const savePizza = () => {
        console.log(titrePizza);
        save(titrePizza);
    };
    const peutSave = () => {
        const peutSave = !(estSelect() && titrePizza !== '');
        return peutSave;

    };
    return (
        <>
            <h2 className='titrePizzaPerso'>{titrePizza}</h2>
            <input className='inputPizzaPerso' type="text" value={titrePizza} onChange={(e) => setTitrePizza(e.target.value)} placeholder="Nommez votre pizza!"/>
            <button className='sauvegarder' disabled={peutSave()} onClick={() => {savePizza()}}>Sauvegarder</button>
            <button className='annuler' onClick={resetPizza}>Annuler</button>
        </>
    );
};

export default PizzaPersoNom;