import '../PizzaPersoNom/PizzaPersoSauvegarde.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const PizzaPersoSauvegarde = ({reset, save, estSelect}) => {
    const navigate = useNavigate();
    const texteInit = '';

    const [titrePizza, setTitrePizza] = useState('');
    const resetPizza = () => {
        reset();
        setTitrePizza(texteInit);
    };
    const savePizza = () => {
        console.log(titrePizza);
        save(titrePizza);
        resetPizza();
        navigate("/pizzas/0");
    };
    const peutSave = () => {
        const peutSave = !(estSelect() && titrePizza.trim() !== '');
        return peutSave;

    };
    return (
        <>
            <input className='inputPizzaPerso' type="text" value={titrePizza} onChange={(e) => setTitrePizza(e.target.value)} placeholder="Nommez votre pizza!"/>
            <button className='sauvegarder' disabled={peutSave()} onClick={() => {savePizza()}}>Sauvegarder</button>
            <button className='annuler' onClick={resetPizza}>Annuler</button>
            <h2 className='titrePizzaPerso'>{titrePizza}</h2>
        </>
    );
};

export default PizzaPersoSauvegarde;
