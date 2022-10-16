import {useState} from 'react';
import UnIngredient from '../UnIngredient/UnIngredient';
import PizzaPersoSauvegarde from '../PizzaPersoNom/PizzaPersoSauvegarde';
import PatePizza from '../PatePizza/PatePizza';
import ListeIngredients from '../ListeIngredients/ListeIngredients';
import './PizzaPersoEdit.css';
const prixBase = 12;

const PizzaPersoEdit = ({addPizza, nbPizzas}) => {

    const [lesIngredients, setLesIngredients] = useState(ListeIngredients);

    const [prixTotal, setPrixTotal] = useState(prixBase);

    // Vérifie si au moins un ingrédient est sélectionné.
    const verifierIngredientSelection = () => {
        let estSelect = false;
        lesIngredients.map(unIngredient => {
            if (unIngredient.checked){
                estSelect = true;
                return;
            }
        });
        return estSelect;
    };
     
    // Inerse la valeur de la propriété "checked" (bool) de l'ingredient passé en paramètre.
    const modifierCheckedIngredient = (ingredient) => {

        console.log("ingredient = " + ingredient.nom);
        const newStateIngredient = lesIngredients.map(unIngredient => {
            if(unIngredient.nom === ingredient.nom) {
                unIngredient.checked ? setPrixTotal(prixTotal-unIngredient.prix) : setPrixTotal(prixTotal+unIngredient.prix);
                return {...unIngredient, checked:(!unIngredient.checked)};
            }
            return unIngredient;
        });
        setLesIngredients(newStateIngredient);
    };

    // Réinitialise tous les champs à leur valeur initiale.
    const resetPizza = () => {
        setLesIngredients(ListeIngredients);
        setPrixTotal(prixBase);
    };

    // Enregistre une nouvelle pizza avec les propriétés selectionnées
    const enregistrerPizza = (titrePizza) => {
        let lesIngredientsPerso = [];
        let lesImgsPerso = [];
        
        lesIngredients.map(unIngredient => {
            if(unIngredient.checked) {
                lesIngredientsPerso = [...lesIngredientsPerso, unIngredient];
            };
        });
        const newPizza = {nom:titrePizza, ingredients:lesIngredientsPerso, prix:prixTotal, qt:1};
        console.log(newPizza);
        addPizza(newPizza);
    };
    const arrondirPrix = (prix) => {
        return prix.toFixed(2);
    }
        
    return (
        <>
            <p className='ingrHeader'>Les Ingrédients</p>
            <ul className='listeIngredients'>
                {lesIngredients.map(function(unIngredient, i){
                    return (
                        <UnIngredient key={'ing_' + unIngredient.nom} ingredient={unIngredient} checkFn={modifierCheckedIngredient}/>
                        );
                    })}
            </ul>
            <div className='ingrContainer'>
                <div className='pizzaEditImgs'>
                    <PatePizza/>
                    {lesIngredients.map(function(unIngredient, i){
                        return unIngredient.checked ? <img key={unIngredient.nom} className='pizzaEditIngreImg' src={"/Img/pizza_"+ unIngredient.img +".png"} alt={unIngredient.nom}></img> : '';
                    })}
                </div>
                <ul className='pizzaPrix'>
                    <li className='prixIngr'> <p>Pix base + {arrondirPrix(prixBase)}$</p> </li>
                    {lesIngredients.map((unIngredient) => {
                        if(unIngredient.checked){
                            
                            return (
                                <li className='prixIngr' key={'ingp_'+unIngredient.nom}> <p>{unIngredient.nom + ' + ' + arrondirPrix(unIngredient.prix) + '$'}</p> </li>
                                );
                            }
                        })}
                    <li className='prixTotal'><p>Prix total = {arrondirPrix(prixTotal)}$</p></li>
                </ul>
                <PizzaPersoSauvegarde reset={resetPizza} save={enregistrerPizza} estSelect={verifierIngredientSelection} nbPizzas={nbPizzas}/>
            </div>
        </>
    );
};

export default PizzaPersoEdit;