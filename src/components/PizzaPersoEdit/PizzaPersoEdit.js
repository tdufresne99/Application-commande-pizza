import {useState} from 'react';
import UnIngredient from '../UnIngredient/UnIngredient';
import PizzaPersoSauvegarde from '../PizzaPersoNom/PizzaPersoSauvegarde';
import PatePizza from '../PatePizza/PatePizza';
import './PizzaPersoEdit.css';
import LesPizzasSaved from '../LesPizzasSaved/LesPizzasSaved';
import { useLocation, Navigate } from 'react-router-dom';


const lesIngredientsInit = [
    {nom:"Fromage", img:"fromage", prix: 1.00, checked: false},
    {nom:"Tomates", img:"tomate", prix: 2.00, checked: false},
    {nom:"Piments Verts", img:"pimentVert", prix: 3.00, checked: false},
    {nom:"Piments Rouges", img:"pimentRouge", prix: 4.00, checked: false},
    {nom:"Piments Jaunes", img:"pimentJaune", prix: 5.00, checked: false},
    {nom:"Olives Vertes", img:"oliveVerte", prix: 6.00, checked: false},
    {nom:"Olives Noires", img:"oliveNoire", prix: 7.00, checked: false},
    {nom:"Oignons Rouges", img:"oignonRouge", prix: 8.00, checked: false},
    {nom:"Oignons Blancs", img:"oignonBlanc", prix: 9.00, checked: false},
    {nom:"Champignons", img:"champignon", prix: 10.00, checked: false},
    {nom:"Ananas", img:"ananas", prix: 11.00, checked: false},
];
const prixBase = 12;

const PizzaPersoEdit = ({addPizza, nbPizzas}) => {

    const [lesIngredients, setLesIngredients] = useState(lesIngredientsInit);

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
        setLesIngredients(lesIngredientsInit);
        setPrixTotal(prixBase);
    };

    // Enregistre une nouvelle pizza avec les propriétés selectionnées
    const enregistrerPizza = (titrePizza) => {
        let lesIngredientsPerso = [];
        let lesImgsPerso = [];
        
        lesIngredients.map(unIngredient => {
            if(unIngredient.checked) {
                lesIngredientsPerso = [...lesIngredientsPerso, unIngredient.nom];
                lesImgsPerso = [...lesImgsPerso, unIngredient.img];
            };
        });
        const newPizza = {nom:titrePizza, ingredients:lesIngredientsPerso, imgs:lesImgsPerso, prix:prixTotal};
        console.log(newPizza);
        addPizza(newPizza);
    };
        
    return (
        <>
            <PizzaPersoSauvegarde reset={resetPizza} save={enregistrerPizza} estSelect={verifierIngredientSelection} nbPizzas={nbPizzas}/>
            <ul className='listeIngredients'>
                    {lesIngredients.map(function(unIngredient, i){
                        return (
                            <UnIngredient key={'ing_' + unIngredient.nom} ingredient={unIngredient} checkFn={modifierCheckedIngredient}/>
                        );
                    })}
            </ul>
            <ul className='pizzaPrix'>
                <li> <p>Pix base: {prixBase}$</p> </li>
                {lesIngredients.map((unIngredient) => {
                    if(unIngredient.checked){
                        
                        return (
                            <li key={'ingp_'+unIngredient.nom}> <p>{unIngredient.nom + ': ' + unIngredient.prix + '$'}</p> </li>
                        );
                    }
                })}
            </ul>
            <h4 class='prixTotal'>Prix total: {prixTotal}$</h4>
            <div className='pizzaEditImgs'>
                <PatePizza/>
                {lesIngredients.map(function(unIngredient, i){
                    return unIngredient.checked ? <img key={unIngredient.nom} className='pizzaEditIngreImg' src={"/Img/pizza_"+ unIngredient.img +".png"} alt={unIngredient.nom}></img> : '';
                })}
            </div>
        </>
    );
};

export default PizzaPersoEdit;