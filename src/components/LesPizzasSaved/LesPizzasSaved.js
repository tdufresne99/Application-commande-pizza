import {useState} from 'react';
import UnePizzaSaved from '../UnePizzaSaved/UnePizzaSaved';
import PizzaPersoEdit from '../PizzaPersoEdit/PizzaPersoEdit';

const LesPizzasSaved = ({newPizza}) => {

    const lesPizzasDefauts = [
        {nom:"La Pizza du Jour", ingredients:["Fromage", "Tomates", "Piments Verts", "Piments Rouges", "Olives Vertes", "Oignons Blancs"], imgs:["fromage", "tomate", "pimentVert", "pimentRouge", "oliveVerte", "oignonBlanc"]},
        {nom:"L'écarlate", ingredients:["Tomates", "Piments Rouges", "Oignons Rouges"], imgs:["tomate", "pimentRouge", "oignonRouge"]},
        {nom:"La Golden Pizza", ingredients:["Fromage", "Piments Jaunes", "Oignons Blancs", "Ananas"], imgs:["fromage", "pimentJaune", "oignonBlanc", "ananas"]},
    ];

    const [lesPizzasSaved, setLesPizzasSaved] = useState(lesPizzasDefauts);

    return (
        <>
            <PizzaPersoEdit addPizza={(laPizza) => setLesPizzasSaved((currentPizzaSaved) => {return [...currentPizzaSaved, laPizza]})}/>
            <ul>
                {lesPizzasSaved.map(function(unePizza,i){
                    return(
                        <UnePizzaSaved key={i} pizza={unePizza}/>
                    );
                })}
            </ul>
        </>
    );
};

export default LesPizzasSaved;